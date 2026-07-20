#import <Foundation/Foundation.h>

typedef void (^ColumboAudioQueueEventHandler)(NSDictionary *payload);

@interface ColumboAudioQueueCoordinator : NSObject

@property (nonatomic, copy, nullable) ColumboAudioQueueEventHandler eventHandler;

- (void)prepareForObservation;
- (BOOL)prepare:(NSError **)error;
- (BOOL)enqueueUri:(NSString *)uri
            itemId:(NSString *)itemId
         requestId:(NSString *_Nullable)requestId
            source:(NSString *_Nullable)source
             error:(NSError **)error;
- (BOOL)start:(NSError **)error;
- (BOOL)pause:(NSError **)error;
- (BOOL)resume:(NSError **)error;
- (BOOL)stop:(NSError **)error;
- (void)invalidate;

@end
