import MobileSDK from '@dolbyio/comms-sdk-react-native';

export default class Recordingservice {
  public static start() {
    return MobileSDK.recording.start();
  }

  public static stop() {
    return MobileSDK.recording.stop();
  }

  public static current() {
    return MobileSDK.recording.current();
  }
}
