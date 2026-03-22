#import <Foundation/Foundation.h>

typedef void (^SchnackAudioQueueEventHandler)(NSDictionary *payload);

@interface SchnackAudioQueueCoordinator : NSObject

@property (nonatomic, copy, nullable) SchnackAudioQueueEventHandler eventHandler;

- (void)prepareForObservation;
- (BOOL)prepare:(NSError **)error;
- (BOOL)enqueueUri:(NSString *)uri
            itemId:(NSString *)itemId
         requestId:(NSString *_Nullable)requestId
            source:(NSString *_Nullable)source
             error:(NSError **)error;
- (BOOL)start:(NSError **)error;
- (BOOL)stop:(NSError **)error;
- (void)invalidate;

@end
