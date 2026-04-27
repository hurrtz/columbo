#import <AVFoundation/AVFoundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import "SchnackAudioQueueCoordinator.h"

static NSString *const SchnackNativeAudioQueueEventName = @"SchnackNativeAudioQueueEvent";

@interface SchnackNativeAudioQueue : RCTEventEmitter <RCTBridgeModule>
@end

@implementation SchnackNativeAudioQueue {
  SchnackAudioQueueCoordinator *_coordinator;
  BOOL _hasListeners;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (instancetype)init
{
  if ((self = [super init])) {
    _coordinator = [SchnackAudioQueueCoordinator new];

    __weak typeof(self) weakSelf = self;
    _coordinator.eventHandler = ^(NSDictionary *payload) {
      __strong typeof(weakSelf) strongSelf = weakSelf;
      if (strongSelf == nil || !strongSelf->_hasListeners) {
        return;
      }

      [strongSelf sendEventWithName:SchnackNativeAudioQueueEventName body:payload];
    };
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[ SchnackNativeAudioQueueEventName ];
}

- (void)startObserving
{
  _hasListeners = YES;
  [_coordinator prepareForObservation];
}

- (void)stopObserving
{
  _hasListeners = NO;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_REMAP_METHOD(prepare,
                 prepareWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = nil;
  if (![_coordinator prepare:&error]) {
    NSString *errorCode =
        [error.domain isEqualToString:NSOSStatusErrorDomain]
            ? @"audio_session_active_error"
            : @"audio_session_category_error";
    reject(errorCode,
           error.localizedDescription ?: @"Audio queue prepare failed.",
           error);
    return;
  }

  resolve(@YES);
}

RCT_REMAP_METHOD(enqueue,
                 enqueueUri:(NSString *)uri
                 itemId:(NSString *)itemId
                 requestId:(NSString *)requestId
                 source:(NSString *)source
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if (uri.length == 0 || itemId.length == 0) {
    reject(@"audio_queue_enqueue_error", @"Audio URI and itemId are required.", nil);
    return;
  }

  NSError *error = nil;
  if (![_coordinator enqueueUri:uri
                         itemId:itemId
                      requestId:requestId
                         source:source
                          error:&error]) {
    reject(@"audio_queue_enqueue_error",
           error.localizedDescription ?: @"Audio queue enqueue failed.",
           error);
    return;
  }

  resolve(@YES);
}

RCT_REMAP_METHOD(start,
                 startWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = nil;
  BOOL started = [_coordinator start:&error];
  if (error != nil) {
    reject(@"audio_queue_start_error",
           error.localizedDescription ?: @"Audio queue start failed.",
           error);
    return;
  }

  resolve(@(started));
}

RCT_REMAP_METHOD(pause,
                 pauseWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = nil;
  if (![_coordinator pause:&error]) {
    reject(@"audio_queue_pause_error",
           error.localizedDescription ?: @"Audio queue pause failed.",
           error);
    return;
  }

  resolve(@YES);
}

RCT_REMAP_METHOD(resume,
                 resumeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = nil;
  BOOL resumed = [_coordinator resume:&error];
  if (error != nil) {
    reject(@"audio_queue_resume_error",
           error.localizedDescription ?: @"Audio queue resume failed.",
           error);
    return;
  }

  resolve(@(resumed));
}

RCT_REMAP_METHOD(stop,
                 stopWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = nil;
  if (![_coordinator stop:&error]) {
    reject(@"audio_queue_stop_error",
           error.localizedDescription ?: @"Audio queue stop failed.",
           error);
    return;
  }

  resolve(@YES);
}

- (void)invalidate
{
  [_coordinator invalidate];
  _coordinator = nil;
  _hasListeners = NO;
  [super invalidate];
}

@end
