#import <Foundation/Foundation.h>
#import <TargetConditionals.h>
#import <React/RCTBridgeModule.h>
#import "SchnackLocalTtsSession.h"

static NSString *SchnackNativeLocalTtsUnavailableReason() {
#if TARGET_OS_SIMULATOR
  return @"Local offline TTS currently requires a physical iPhone. The iOS simulator backend crashes inside sherpa during initialization.";
#else
  return nil;
#endif
}

@interface SchnackNativeLocalTts : NSObject <RCTBridgeModule>
@end

@implementation SchnackNativeLocalTts

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSDictionary *)constantsToExport
{
  NSString *reason = SchnackNativeLocalTtsUnavailableReason();
  return @{
    @"isSimulator": @(
#if TARGET_OS_SIMULATOR
      YES
#else
      NO
#endif
    ),
    @"unavailableReason": reason ?: [NSNull null],
  };
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0);
}

RCT_REMAP_METHOD(initialize,
                 initializeInstance:(NSString *)instanceId
                 config:(NSDictionary *)config
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if (instanceId.length == 0) {
    reject(@"local_tts_init_error", @"instanceId is required.", nil);
    return;
  }

  NSString *unavailableReason = SchnackNativeLocalTtsUnavailableReason();
  if (unavailableReason != nil) {
    reject(@"local_tts_init_error", unavailableReason, nil);
    return;
  }

  NSString *errorMessage = nil;
  if (![SchnackLocalTtsSession initializeInstance:instanceId
                                           config:config
                                     errorMessage:&errorMessage]) {
    reject(@"local_tts_init_error",
           errorMessage ?: @"Unknown local TTS initialization error.",
           nil);
    return;
  }

  resolve(@YES);
}

RCT_REMAP_METHOD(generateToFile,
                 generateToFileForInstance:(NSString *)instanceId
                 text:(NSString *)text
                 speakerId:(double)speakerId
                 speed:(double)speed
                 outputPath:(NSString *)outputPath
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if (instanceId.length == 0 || text.length == 0) {
    reject(@"local_tts_generate_error", @"instanceId and text are required.", nil);
    return;
  }

  NSString *unavailableReason = SchnackNativeLocalTtsUnavailableReason();
  if (unavailableReason != nil) {
    reject(@"local_tts_generate_error", unavailableReason, nil);
    return;
  }

  NSString *errorMessage = nil;
  NSString *generatedPath = [SchnackLocalTtsSession generateToFileForInstance:instanceId
                                                                         text:text
                                                                    speakerId:speakerId
                                                                        speed:speed
                                                                   outputPath:outputPath
                                                                 errorMessage:&errorMessage];
  if (generatedPath.length == 0) {
    reject(@"local_tts_generate_error",
           errorMessage ?: @"Unknown local TTS generation error.",
           nil);
    return;
  }

  resolve(generatedPath);
}

RCT_REMAP_METHOD(release,
                 releaseInstance:(NSString *)instanceId
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if (instanceId.length == 0) {
    resolve(@NO);
    return;
  }

  resolve(@([SchnackLocalTtsSession releaseInstance:instanceId]));
}

@end
