#import "SchnackLocalTtsFileWriter.h"

#include <algorithm>
#include <fstream>
#include <string>

bool SchnackWriteLocalTtsWavFile(const std::vector<float> &samples,
                                 int32_t sampleRate,
                                 NSString *targetPath) {
  if (samples.empty() || sampleRate <= 0 || targetPath.length == 0) {
    return false;
  }

  std::ofstream output(std::string(targetPath.UTF8String), std::ios::binary);
  if (!output) {
    return false;
  }

  const int32_t numChannels = 1;
  const int32_t bitsPerSample = 16;
  const int32_t byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const int32_t blockAlign = numChannels * bitsPerSample / 8;
  const int32_t dataSize = static_cast<int32_t>(samples.size()) * bitsPerSample / 8;
  const int32_t chunkSize = 36 + dataSize;

  output.write("RIFF", 4);
  output.write(reinterpret_cast<const char *>(&chunkSize), 4);
  output.write("WAVE", 4);
  output.write("fmt ", 4);
  const int32_t subchunk1Size = 16;
  output.write(reinterpret_cast<const char *>(&subchunk1Size), 4);
  const int16_t audioFormat = 1;
  output.write(reinterpret_cast<const char *>(&audioFormat), 2);
  const int16_t numChannelsInt16 = static_cast<int16_t>(numChannels);
  output.write(reinterpret_cast<const char *>(&numChannelsInt16), 2);
  output.write(reinterpret_cast<const char *>(&sampleRate), 4);
  output.write(reinterpret_cast<const char *>(&byteRate), 4);
  const int16_t blockAlignInt16 = static_cast<int16_t>(blockAlign);
  output.write(reinterpret_cast<const char *>(&blockAlignInt16), 2);
  const int16_t bitsPerSampleInt16 = static_cast<int16_t>(bitsPerSample);
  output.write(reinterpret_cast<const char *>(&bitsPerSampleInt16), 2);
  output.write("data", 4);
  output.write(reinterpret_cast<const char *>(&dataSize), 4);

  for (float sample : samples) {
    float clamped = std::max(-1.0f, std::min(1.0f, sample));
    int16_t intSample = static_cast<int16_t>(clamped * 32767.0f);
    output.write(reinterpret_cast<const char *>(&intSample), sizeof(int16_t));
  }

  output.close();
  return true;
}

@implementation SchnackLocalTtsFileWriter

+ (NSString *)resolveFilesystemPath:(NSString *)path
{
  if (path == nil || path.length == 0) {
    return nil;
  }

  if ([path hasPrefix:@"file://"]) {
    NSURL *fileURL = [NSURL URLWithString:path];
    if (fileURL.isFileURL && fileURL.path.length > 0) {
      return fileURL.path;
    }
  }

  return path;
}

+ (BOOL)fileExistsAtPath:(NSString *)path
{
  NSString *resolvedPath = [self resolveFilesystemPath:path];
  return resolvedPath != nil &&
         [[NSFileManager defaultManager] fileExistsAtPath:resolvedPath];
}

+ (BOOL)ensureParentDirectoryExistsForPath:(NSString *)path
                                     error:(NSError **)error
{
  NSString *resolvedPath = [self resolveFilesystemPath:path];
  if (resolvedPath.length == 0) {
    return NO;
  }

  NSString *directoryPath = [resolvedPath stringByDeletingLastPathComponent];
  if (directoryPath.length == 0) {
    return NO;
  }

  return [[NSFileManager defaultManager] createDirectoryAtPath:directoryPath
                                   withIntermediateDirectories:YES
                                                    attributes:nil
                                                         error:error];
}

+ (NSString *)joinExistingLexiconPaths:(NSArray<NSString *> *)paths
{
  NSMutableArray<NSString *> *existing = [NSMutableArray array];
  for (NSString *path in paths) {
    if (![path isKindOfClass:[NSString class]] || ![self fileExistsAtPath:path]) {
      continue;
    }

    NSString *resolvedPath = [self resolveFilesystemPath:path];
    if (resolvedPath.length > 0) {
      [existing addObject:resolvedPath];
    }
  }

  return [existing componentsJoinedByString:@","];
}

@end
