#import <Foundation/Foundation.h>

#ifdef __cplusplus
#include <optional>

#if __has_include("sherpa-onnx/c-api/cxx-api.h")
#include "sherpa-onnx/c-api/cxx-api.h"
#elif __has_include("../../node_modules/react-native-sherpa-onnx/ios/Frameworks/sherpa_onnx.xcframework/ios-arm64_x86_64-simulator/Headers/sherpa-onnx/c-api/cxx-api.h")
#include "../../node_modules/react-native-sherpa-onnx/ios/Frameworks/sherpa_onnx.xcframework/ios-arm64_x86_64-simulator/Headers/sherpa-onnx/c-api/cxx-api.h"
#elif __has_include("../../node_modules/react-native-sherpa-onnx/ios/Frameworks/sherpa_onnx.xcframework/ios-arm64/Headers/sherpa-onnx/c-api/cxx-api.h")
#include "../../node_modules/react-native-sherpa-onnx/ios/Frameworks/sherpa_onnx.xcframework/ios-arm64/Headers/sherpa-onnx/c-api/cxx-api.h"
#else
#error "Unable to locate sherpa-onnx cxx-api.h"
#endif

std::optional<sherpa_onnx::cxx::OfflineTtsConfig> SchnackBuildLocalTtsConfig(
    NSDictionary *config,
    NSString **errorMessage);
#endif
