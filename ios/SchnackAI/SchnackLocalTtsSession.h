#import <Foundation/Foundation.h>

@interface SchnackLocalTtsSession : NSObject

+ (BOOL)initializeInstance:(NSString *)instanceId
                    config:(NSDictionary *)config
              errorMessage:(NSString **)errorMessage;
+ (NSString *_Nullable)generateToFileForInstance:(NSString *)instanceId
                                            text:(NSString *)text
                                       speakerId:(double)speakerId
                                           speed:(double)speed
                                      outputPath:(NSString *_Nullable)outputPath
                                    errorMessage:(NSString **)errorMessage;
+ (BOOL)releaseInstance:(NSString *)instanceId;

@end
