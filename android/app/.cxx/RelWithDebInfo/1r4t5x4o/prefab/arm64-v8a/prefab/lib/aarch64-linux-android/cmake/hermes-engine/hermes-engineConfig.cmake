if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/sanjeev/.gradle/caches/8.10.2/transforms/cf0b5af9151130fc0bd44742a94abae3/transformed/jetified-hermes-android-0.76.3-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/sanjeev/.gradle/caches/8.10.2/transforms/cf0b5af9151130fc0bd44742a94abae3/transformed/jetified-hermes-android-0.76.3-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

