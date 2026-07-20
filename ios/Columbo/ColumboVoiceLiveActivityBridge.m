#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ColumboVoiceLiveActivity, NSObject)

RCT_EXTERN_METHOD(setState:(NSString *)phase
                  expectedSpeechAtMs:(NSNumber * _Nullable)expectedSpeechAtMs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(endActivity:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
