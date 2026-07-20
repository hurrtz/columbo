#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

@interface ColumboAudioQueueSession : NSObject

+ (BOOL)activatePlaybackSession:(NSError **)error;
+ (void)deactivatePlaybackSessionIfIdleForPlayer:(AVQueuePlayer *_Nullable)player;

@end
