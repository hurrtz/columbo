#import <Foundation/Foundation.h>

#ifdef __cplusplus
#include <vector>

bool SchnackWriteLocalTtsWavFile(const std::vector<float> &samples,
                                 int32_t sampleRate,
                                 NSString *targetPath);
#endif

@interface SchnackLocalTtsFileWriter : NSObject

+ (NSString *_Nullable)resolveFilesystemPath:(NSString *_Nullable)path;
+ (BOOL)fileExistsAtPath:(NSString *_Nullable)path;
+ (BOOL)ensureParentDirectoryExistsForPath:(NSString *)path
                                     error:(NSError **)error;
+ (NSString *)joinExistingLexiconPaths:(NSArray<NSString *> *)paths;

@end
