#import "ColumboAudioQueueSession.h"

@implementation ColumboAudioQueueSession

+ (BOOL)activatePlaybackSession:(NSError **)error
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  NSError *categoryError = nil;
  NSError *activeError = nil;

  [session setCategory:AVAudioSessionCategoryPlayback
                  mode:AVAudioSessionModeDefault
               options:0
                 error:&categoryError];
  if (categoryError != nil) {
    if (error != nil) {
      *error = categoryError;
    }
    return NO;
  }

  [session setActive:YES error:&activeError];
  if (activeError != nil) {
    if (error != nil) {
      *error = activeError;
    }
    return NO;
  }

  return YES;
}

+ (void)deactivatePlaybackSessionIfIdleForPlayer:(AVQueuePlayer *)player
{
  if (player != nil && (player.currentItem != nil || player.items.count > 0)) {
    return;
  }

  AVAudioSession *session = [AVAudioSession sharedInstance];
  NSError *error = nil;
  [session setActive:NO
         withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation
               error:&error];
}

@end
