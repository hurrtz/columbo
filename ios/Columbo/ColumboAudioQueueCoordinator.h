#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^ColumboAudioQueueEventHandler)(NSDictionary *payload);

@interface ColumboAudioQueueCoordinator : NSObject

@property (nonatomic, copy, nullable) ColumboAudioQueueEventHandler eventHandler;

- (void)prepareForObservation;
- (BOOL)prepare:(NSError *_Nullable *_Nullable)error;
- (BOOL)enqueueUri:(NSString *)uri
            itemId:(NSString *)itemId
         requestId:(NSString *_Nullable)requestId
            source:(NSString *_Nullable)source
             error:(NSError *_Nullable *_Nullable)error;
- (BOOL)start:(NSError *_Nullable *_Nullable)error;
- (BOOL)pause:(NSError *_Nullable *_Nullable)error;
- (BOOL)resume:(NSError *_Nullable *_Nullable)error;
- (BOOL)stop:(NSError *_Nullable *_Nullable)error;
- (void)invalidate;

@end

NS_ASSUME_NONNULL_END
