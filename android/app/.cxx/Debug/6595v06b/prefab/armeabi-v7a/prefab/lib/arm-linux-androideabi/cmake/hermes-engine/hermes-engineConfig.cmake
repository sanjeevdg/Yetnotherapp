if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/sanjeev/.gradle/caches/8.10.2/transforms/fe7f3a10dbc7e12141e31a044a28c831/transformed/jetified-hermes-android-0.76.3-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/sanjeev/.gradle/caches/8.10.2/transforms/fe7f3a10dbc7e12141e31a044a28c831/transformed/jetified-hermes-android-0.76.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

