# recreate [![Build Status](https://travis-ci.org/agrc/recreate.svg?branch=master)](https://travis-ci.org/agrc/recreate)
React native app for recreation locations

## Installation
1. `git clone https://github.com/agrc/recreate && cd recreate`
1. `npm install`
1. Create a `.env` file in the root directory. Use `.env.sample` as an example.

You can go to the [`react-native` docs](http://facebook.github.io/react-native/docs/getting-started.html) for more info.

## Development
This project was bootstrapped with [react-native-cli](https://github.com/facebook/react-native).

Run project in simulators:  
`react-native run-ios` && `react-native run-android`

Note: Android emulator needs to be started manually.

Run project in production:  
`react-native run-ios --configuration Release`

Run project on connected device:  
`react-native run-ios --device`  

Lint (via eslint):
`npm run lint`  

Upgrade react-native:
`npm i -g react-native-git-upgrade`
`react-native-git-upgrade`


### Deployment Steps
[DTS Mobile Application Deployment Doc](https://dts.utah.gov/mdm-mobile-device-management/mobile-application-deployment)
1. Bump version number in `package.json`, `ios/RecreateNative/Info.plist`, and `android/app/build.gradle`.
1. Confirm that you can generate an archive in Xcode (Set to Generic iOS Device, Product -> Archive) and APK in Android Studio (Build -> Build APKs)
1. Update `src/ChangeLog.js`
1. Commit and tag new version.
1. Submit a [Mobile Application Deployment Form](https://utah.service-now.com/nav_to.do?uri=%2Fcom.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3D360c377f13bcb640d6017e276144b056%26sysparm_link_parent%3D0b596c5c1321a240abab7e776144b056%26sysparm_catalog%3De0d08b13c3330100c8b837659bba8fb4%26sysparm_catalog_view%3Dcatalog_default)
    - Make sure to leave a note if this is for a TestFlight deployment.

## Useful Tools
[`react-native-debugger`](https://github.com/jhen0409/react-native-debugger)

`⌘D` (iOS) & `⌘M` (Android) open the developer menu within the app. This can be used to enable live reload and remote debugging.

List of native-base icons: https://oblador.github.io/react-native-vector-icons/
