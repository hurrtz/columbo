#import "SchnackLocalTtsConfigBuilder.h"

#import "SchnackLocalTtsFileWriter.h"

#include <string>

namespace {

void SetLocalTtsConfigError(NSString **errorMessage, NSString *message) {
  if (errorMessage != nil) {
    *errorMessage = message;
  }
}

}  // namespace

std::optional<sherpa_onnx::cxx::OfflineTtsConfig> SchnackBuildLocalTtsConfig(
    NSDictionary *config,
    NSString **errorMessage) {
  NSString *modelType = config[@"modelType"];
  NSString *modelPath = config[@"modelPath"];
  NSString *tokensPath = config[@"tokensPath"];
  NSString *dataDirPath = config[@"dataDirPath"];
  NSNumber *numThreads = config[@"numThreads"];
  NSNumber *debug = config[@"debug"];
  NSString *provider = config[@"provider"];

  if (modelType.length == 0 || modelPath.length == 0 || tokensPath.length == 0 ||
      dataDirPath.length == 0) {
    SetLocalTtsConfigError(
        errorMessage,
        @"modelType, modelPath, tokensPath, and dataDirPath are required.");
    return std::nullopt;
  }

  if (![SchnackLocalTtsFileWriter fileExistsAtPath:modelPath] ||
      ![SchnackLocalTtsFileWriter fileExistsAtPath:tokensPath] ||
      ![SchnackLocalTtsFileWriter fileExistsAtPath:dataDirPath]) {
    SetLocalTtsConfigError(errorMessage,
                           @"One or more local TTS model files are missing.");
    return std::nullopt;
  }

  sherpa_onnx::cxx::OfflineTtsConfig nativeConfig;
  nativeConfig.model.num_threads = numThreads != nil ? numThreads.intValue : 2;
  nativeConfig.model.debug = debug != nil ? debug.boolValue : false;
  nativeConfig.model.provider =
      provider.length > 0 ? std::string(provider.UTF8String) : "cpu";

  std::string modelTypeValue(modelType.UTF8String);
  NSString *resolvedModelPath = [SchnackLocalTtsFileWriter resolveFilesystemPath:modelPath];
  NSString *resolvedTokensPath = [SchnackLocalTtsFileWriter resolveFilesystemPath:tokensPath];
  NSString *resolvedDataDirPath = [SchnackLocalTtsFileWriter resolveFilesystemPath:dataDirPath];

  if (modelTypeValue == "vits") {
    nativeConfig.model.vits.model = std::string(resolvedModelPath.UTF8String);
    nativeConfig.model.vits.tokens = std::string(resolvedTokensPath.UTF8String);
    nativeConfig.model.vits.data_dir = std::string(resolvedDataDirPath.UTF8String);

    NSString *lexiconPath = config[@"lexiconPath"];
    if ([SchnackLocalTtsFileWriter fileExistsAtPath:lexiconPath]) {
      NSString *resolvedLexiconPath =
          [SchnackLocalTtsFileWriter resolveFilesystemPath:lexiconPath];
      nativeConfig.model.vits.lexicon = std::string(resolvedLexiconPath.UTF8String);
    }

    NSNumber *noiseScale = config[@"noiseScale"];
    NSNumber *noiseScaleW = config[@"noiseScaleW"];
    NSNumber *lengthScale = config[@"lengthScale"];
    if (noiseScale != nil) {
      nativeConfig.model.vits.noise_scale = noiseScale.floatValue;
    }
    if (noiseScaleW != nil) {
      nativeConfig.model.vits.noise_scale_w = noiseScaleW.floatValue;
    }
    if (lengthScale != nil) {
      nativeConfig.model.vits.length_scale = lengthScale.floatValue;
    }
  } else if (modelTypeValue == "kokoro") {
    NSString *voicesPath = config[@"voicesPath"];
    if (![SchnackLocalTtsFileWriter fileExistsAtPath:voicesPath]) {
      SetLocalTtsConfigError(errorMessage, @"The Kokoro voices file is missing.");
      return std::nullopt;
    }

    NSString *resolvedVoicesPath =
        [SchnackLocalTtsFileWriter resolveFilesystemPath:voicesPath];
    nativeConfig.model.kokoro.model = std::string(resolvedModelPath.UTF8String);
    nativeConfig.model.kokoro.tokens = std::string(resolvedTokensPath.UTF8String);
    nativeConfig.model.kokoro.data_dir = std::string(resolvedDataDirPath.UTF8String);
    nativeConfig.model.kokoro.voices = std::string(resolvedVoicesPath.UTF8String);

    NSArray<NSString *> *lexiconPaths = config[@"lexiconPaths"];
    NSString *joinedLexiconPaths =
        [SchnackLocalTtsFileWriter joinExistingLexiconPaths:lexiconPaths ?: @[]];
    if (joinedLexiconPaths.length > 0) {
      nativeConfig.model.kokoro.lexicon =
          std::string(joinedLexiconPaths.UTF8String);
    }

    NSString *lang = config[@"lang"];
    if (lang.length > 0) {
      nativeConfig.model.kokoro.lang = std::string(lang.UTF8String);
    }

    NSNumber *lengthScale = config[@"lengthScale"];
    if (lengthScale != nil) {
      nativeConfig.model.kokoro.length_scale = lengthScale.floatValue;
    }
  } else {
    SetLocalTtsConfigError(
        errorMessage,
        [NSString stringWithFormat:@"Unsupported model type: %@", modelType]);
    return std::nullopt;
  }

  NSString *ruleFsts = config[@"ruleFsts"];
  if (ruleFsts.length > 0) {
    nativeConfig.rule_fsts = std::string(ruleFsts.UTF8String);
  }

  NSString *ruleFars = config[@"ruleFars"];
  if (ruleFars.length > 0) {
    nativeConfig.rule_fars = std::string(ruleFars.UTF8String);
  }

  NSNumber *maxNumSentences = config[@"maxNumSentences"];
  if (maxNumSentences != nil && maxNumSentences.intValue >= 1) {
    nativeConfig.max_num_sentences = maxNumSentences.intValue;
  }

  NSNumber *silenceScale = config[@"silenceScale"];
  if (silenceScale != nil) {
    nativeConfig.silence_scale = silenceScale.floatValue;
  }

  return nativeConfig;
}
