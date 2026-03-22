#import "SchnackLocalTtsSession.h"

#import "SchnackLocalTtsConfigBuilder.h"
#import "SchnackLocalTtsFileWriter.h"

#include <memory>
#include <mutex>
#include <optional>
#include <string>
#include <unordered_map>

namespace {

struct SchnackLocalTtsState {
  std::optional<sherpa_onnx::cxx::OfflineTts> tts;
  std::string modelType;
};

std::unordered_map<std::string, std::shared_ptr<SchnackLocalTtsState>>
    g_local_tts_instances;
std::mutex g_local_tts_mutex;

void SetLocalTtsSessionError(NSString **errorMessage, NSString *message) {
  if (errorMessage != nil) {
    *errorMessage = message;
  }
}

NSString *CreateLocalTtsOutputPath(NSString *instanceId) {
  NSString *tmpName = [NSString stringWithFormat:@"local-tts-%@-%@.wav",
                                                 instanceId,
                                                 NSUUID.UUID.UUIDString];
  return [NSTemporaryDirectory() stringByAppendingPathComponent:tmpName];
}

}  // namespace

@implementation SchnackLocalTtsSession

+ (BOOL)initializeInstance:(NSString *)instanceId
                    config:(NSDictionary *)config
              errorMessage:(NSString **)errorMessage
{
  @try {
    try {
      auto nativeConfig = SchnackBuildLocalTtsConfig(config, errorMessage);
      if (!nativeConfig.has_value()) {
        return NO;
      }

      auto state = std::make_shared<SchnackLocalTtsState>();
      NSString *modelType = config[@"modelType"];
      state->modelType = modelType.length > 0 ? std::string(modelType.UTF8String) : "";
      state->tts = sherpa_onnx::cxx::OfflineTts::Create(nativeConfig.value());

      std::lock_guard<std::mutex> lock(g_local_tts_mutex);
      g_local_tts_instances[std::string(instanceId.UTF8String)] = state;
      return YES;
    } catch (const std::exception &exception) {
      SetLocalTtsSessionError(
          errorMessage,
          [NSString stringWithUTF8String:exception.what()]);
      return NO;
    } catch (...) {
      SetLocalTtsSessionError(errorMessage,
                              @"Unknown local TTS initialization error.");
      return NO;
    }
  } @catch (NSException *exception) {
    SetLocalTtsSessionError(errorMessage, exception.reason);
    return NO;
  }
}

+ (NSString *)generateToFileForInstance:(NSString *)instanceId
                                   text:(NSString *)text
                              speakerId:(double)speakerId
                                  speed:(double)speed
                             outputPath:(NSString *)outputPath
                           errorMessage:(NSString **)errorMessage
{
  std::shared_ptr<SchnackLocalTtsState> state;
  {
    std::lock_guard<std::mutex> lock(g_local_tts_mutex);
    auto it = g_local_tts_instances.find(std::string(instanceId.UTF8String));
    if (it == g_local_tts_instances.end() || !it->second->tts.has_value()) {
      SetLocalTtsSessionError(errorMessage,
                              @"The local TTS instance is not initialized.");
      return nil;
    }
    state = it->second;
  }

  @try {
    try {
      auto audio = state->tts.value().Generate(std::string(text.UTF8String),
                                               static_cast<int32_t>(speakerId),
                                               static_cast<float>(speed));

      if (audio.samples.empty() || audio.sample_rate <= 0) {
        SetLocalTtsSessionError(errorMessage,
                                @"The local TTS engine produced no audio.");
        return nil;
      }

      NSString *targetPath = outputPath.length > 0
                                 ? outputPath
                                 : CreateLocalTtsOutputPath(instanceId);
      NSString *resolvedTargetPath =
          [SchnackLocalTtsFileWriter resolveFilesystemPath:targetPath];

      NSError *directoryError = nil;
      if (![SchnackLocalTtsFileWriter ensureParentDirectoryExistsForPath:resolvedTargetPath
                                                                   error:&directoryError]) {
        SetLocalTtsSessionError(
            errorMessage,
            directoryError.localizedDescription ?:
                @"The generated local TTS audio directory could not be prepared.");
        return nil;
      }

      if (!SchnackWriteLocalTtsWavFile(audio.samples,
                                       audio.sample_rate,
                                       resolvedTargetPath)) {
        SetLocalTtsSessionError(errorMessage,
                                @"The generated local TTS audio could not be saved.");
        return nil;
      }

      return targetPath;
    } catch (const std::exception &exception) {
      SetLocalTtsSessionError(
          errorMessage,
          [NSString stringWithUTF8String:exception.what()]);
      return nil;
    } catch (...) {
      SetLocalTtsSessionError(errorMessage,
                              @"Unknown local TTS generation error.");
      return nil;
    }
  } @catch (NSException *exception) {
    SetLocalTtsSessionError(errorMessage, exception.reason);
    return nil;
  }
}

+ (BOOL)releaseInstance:(NSString *)instanceId
{
  @try {
    std::lock_guard<std::mutex> lock(g_local_tts_mutex);
    return g_local_tts_instances.erase(std::string(instanceId.UTF8String)) > 0;
  } @catch (__unused NSException *exception) {
    return NO;
  }
}

@end
