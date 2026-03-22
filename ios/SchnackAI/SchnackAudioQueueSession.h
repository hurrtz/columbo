#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

@interface SchnackAudioQueueSession : NSObject

+ (BOOL)activatePlaybackSession:(NSError **)error;
+ (void)deactivatePlaybackSessionIfIdleForPlayer:(AVQueuePlayer *_Nullable)player;

@end
