# Dolby.io Communications Video Call - React Native Mobile App

<p align="center">
    <img src="documentation/assets/banner%20image.png" width="175px" />
</p>

## Overview

Build a one-to-one or small-group live video conferencing app with features like recording, a/v controls and more.

| Use cases          | Features                                                   | Tech Stack   |
| ------------------ | ---------------------------------------------------------- | ------------ |
| 1:1 calls          | Login via QR code                                          | TypeScript   |
| Group calls        | Create, join, leave or re-join a conference                | React Native |
| Video Conferencing | Change camera and mic settings                             | iOS          |
|                    | Mute and unmute local or remote participants               | Android      |
|                    | Participant Lists                                          |              |
|                    | Detect if a participant is speaking                        |              |
|                    | Display participants in a grid (<=6 participants)          |              |
|                    | Dynamically re-order participants based on who is speaking |              |
|                    | Creating a shareable link                                  |              |

Want to learn more? Check out our [React Native Sample App gallery page](https://docs.dolby.io/communications-apis/docs/video-call)!

## Getting Started

### Pre-requisites

This setup guide is validated on both Intel/M1-based MacBook Pro running macOS Monterey 12.6.

#### iOS

* XCode Version 14.0.1 (14A400)
* iOS Simulator running iOS 15.5
* Ruby Gems version 3.0.3.1

#### Android

* Android studio chipmunk (2021.2.1)
* JDK version 11
* Android physical device running Android S
* Android emulator running API 29 or greater
* CMake 3.18.1

#### Other

* Yarn version 1.22.19
* Node version 16.17.1
* Npm version 8.19.2
* A Dolby.io account

#### How to get a Dolby.io account

To setup your Dolby.io account, go to the [Dolby.io dashboard](https://dashboard.dolby.io/signup/) and complete the form. After confirming your email address, you will be logged in.  

### Cloning the repo and installing the dependencies

The React Native example app is hosted in a yarn-based mono-repo. There are shared components and libraries at the root of the project and then there are React Native-specific ones under the `example/mobile/` directory.

After cloning the project repo, go to the project directory and install the dependencies with yarn.

```bash
cd comms-app-react-native-videocall
yarn install
```

If you do not have it already, install `ios-deploy` globally on your machine.

```bash
npm install -g ios-deploy
```

### Building the iOS app

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

### Building the Android app

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

## Known Issues

The known issues of this example app can be found [here](KNOWN-ISSUES.md).

## License

The Dolby.io Communications Sample for React Native and its repository are licensed under the MIT License.

Third-party licenses can be found [here](third-party-licenses.json).

## More resources

Looking for more sample apps and projects? Head to the [Project Gallery](https://docs.dolby.io/communications-apis/page/gallery).