@ECHO OFF
cd android && gradlew assembleRelease && start app\build\outputs\apk\release && cd ..
#-x bundleReleaseJsAndAssets