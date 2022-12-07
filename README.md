# Dolby.io Communications Video Call - React Native Mobile App

## Readme

This document serves as a guide on how to build the React Native Video Conference sample app for mobile from the source.

## Pre-requisites

This setup guide is validated on both Intel/M1-based MacBook Pro running macOS Monterey 12.6.

### iOS

* XCode Version 14.0.1 (14A400)
* iOS Simulator running iOS 15.5
* Ruby Gems version 3.0.3.1

### Android

* Android studio chipmunk (2021.2.1)
* JDK version 11
* Android physical device running Android S
* Android emulator running API 29 or greater
* CMake 3.18.1

### Other

* Yarn version 1.22.19
* Node version 16.17.1
* Npm version 8.19.2
* A [Dolby.io](https://dashboard.dolby.io/signup/) account
* A Dolby.io [client access token](https://dashboard.dolby.io/dashboard/applications/summary)

## Cloning the repo and installing the dependencies

The React Native example app is hosted in a yarn-based mono-repo. There are shared components and libraries at the root of the project and then there are React Native-specific ones under the `example/mobile/` directory.

Get the code by cloning this repo using git.

```bash
git clone git@github.com:dolbyio-samples/comms-app-react-native-videocall.git
```

Go to the project directory, and install the dependencies with yarn.

```bash
cd comms-app-react-native-videocall
yarn install
```

If you do not have it already, install `ios-deploy` globally on your machine.

```bash
npm install -g ios-deploy
```

## Building the iOS app

To build the iOS app, we install the additional iOS dependencies with Cocoapod. Perform the following steps

```bash
cd examples/mobile/ios
pod install
cd ../../../
```

> Note: If you get this error - `xcrun: error: SDK "iphoneos" cannot be located`, follow the steps in the selected answer [here](https://stackoverflow.com/questions/68565356/xcrun-error-sdk-iphoneos-cannot-be-located).

### Running the app

To build and run the app, you'll need two terminal windows, both open in the same root directory.

The first terminal window is required to run the Metro JS bundler.

In that window, run the following command

```bash
yarn workspace comms-app-react-native-videocall start 
```

In the other window, run this command for the iOS simulator

```bash
yarn workspace comms-app-react-native-videocall ios
```

Or run this command for the iOS device

```bash
yarn workspace comms-app-react-native-videocall ios --device
```

You will see the following screen after the app compiles. This process should take a few minutes. If you see a blank screen, please wait before reloading the app through the metro interface (by pressing `r` on the first terminal window you opened).

> Note: If you encounter the error `DolbyIOVideoCall.xcodeproj: error: No profile for team 'XYZ' matching 'Dolby IO Video Call Development'`, open the workspace `examples/mobile/ios/DolbyIOVideoCall.xcworkspace` in Xcode. Open the project **DolbyIOVideoCall** and click on the tab **Signing and Capabilities**. From there, change the *Bundle Identifier* as well as the *Provisioning Profiles* for both Debug and Release modes.

## Building the Android App

The path to the Android SDK shall be defined either as an ENV variable or in the `local.properties` file.

The `local.properties` file needs to be located at `examples/mobile/android/local.properties`

The file must contain the following contents

```properties
sdk.dir=/path/to/Android/sdk
```

The android SDK can usually be found in the `/users/<USER>/Library/Android/sdk` directory.

To build the app, you'll need two terminal windows, both open in the same root directory.

The first terminal window is required to run the Metro JS bundler.

In that window, run the following command - This is optional since it is auto-run on Android.

```bash
yarn workspace comms-app-react-native-videocall start
```

In the other window, run this command - This can automatically trigger the step above if it hasn't run.

```bash
yarn workspace comms-app-react-native-videocall android
```

## Features

The major features of this example app.

* Allow participants to scan a QR code or enter an authentication token from Dolby.io Dashboard to login
* Logout from the video calling app
* Create/Join/Re-join/Leave a video conference call
* Share a meeting link
* Mute the mic
* Mute all remote participants
* Turn on/off the camera
* Switch between the cameras
* Show participants list and count
* Show who is speaking
* Show the video grid with 6 active speakers (if participants count <= 6)
* Replace the least active speaker with a new active speaker, when the new active speaker turns on the camera or speaks without a camera
* The participant who creates the meeting can record the meeting
* Participants joining the meeting cannot start a recording
* Meeting recordings can be accessed from the Dolby.io Dashboard

## Known Issues

The known issues of this example app can be found [here](KNOWN-ISSUES.md).

## License

The Dolby.io Communications Sample for React Native and its repository are licensed under the MIT License.

Third-party licenses can be found [here](third-party-licenses.json).
