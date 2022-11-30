# v1.0-rc3

The issues are mainly in the following areas

* No proper background support on both Android and iOS.
* Edges cases are not handled properly, such as mic/camera permission and no network.
* Sometimes camera and mic do not work after re-joining the meeting.

Not all the issues are listed there.

* Individual device or model-specific issues
* Minor and edge case issues

| **Title**                                               | **Description**                                                                                                   | **Comment**                                                                                              |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| App Backgrounding Issues                                | The app does not work properly in backgrounding and after, such as, no camera capture and a call is disconnected | The example app wasn't designed and implemented with background handling in mind                         |
| Create or join a meeting without mic permission         | A user creates or joins a meeting without mic permission on an iOS device                                         | The example app wasn't designed and implemented to take care of all the corner cases                     |
| Can't leave a meeting or stop a recording if no network | A user can't leave a meeting or stop a recording when there is no network connection                              | The example app was designed and implemented with the assumption that there is a good network connection |
| Can't open a shared meeting link on an Android device   | Opening a shared meeting link on an android device doesn't open the app and start the shared meeting.             | Universal link is not supported in this sample app, so it is not supported on Android devices            |