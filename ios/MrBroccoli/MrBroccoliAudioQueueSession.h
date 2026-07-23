#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MrBroccoliAudioQueueSession : NSObject

+ (BOOL)activatePlaybackSession:(NSError *_Nullable *_Nullable)error;
+ (void)deactivatePlaybackSessionIfIdleForPlayer:(AVQueuePlayer *_Nullable)player;

@end


NS_ASSUME_NONNULL_END
