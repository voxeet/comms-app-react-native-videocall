import MobileSDK from '@dolbyio/comms-sdk-react-native';
import type {
  ConferenceStatusUpdatedEventType,
  ParticipantChangedEventType,
  PermissionsUpdatedEventType,
  StreamChangedEventType,
} from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/events';
import type {
  ConferenceJoinOptions,
  Participant,
  Conference,
  ConferenceCreateOptions,
} from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';

export default class ConferenceService {
  public static create(options: ConferenceCreateOptions) {
    return MobileSDK.conference.create(options);
  }

  public static current() {
    return MobileSDK.conference.current;
  }

  public static fetch(conferenceId: string) {
    return MobileSDK.conference.fetch(conferenceId);
  }

  public static join(conference: Conference, options: ConferenceJoinOptions) {
    return MobileSDK.conference.join(conference, options);
  }

  public static mute(participant: Participant, isMuted: boolean) {
    return MobileSDK.conference.mute(participant, isMuted);
  }

  public static isMuted() {
    return MobileSDK.conference.isMuted();
  }

  public static isSpeaking(participant: Participant) {
    return MobileSDK.conference.isSpeaking(participant);
  }

  public static onStatusChange(handler: (data: ConferenceStatusUpdatedEventType) => void) {
    return MobileSDK.conference.onStatusChange(handler);
  }

  public static onStreamsChange(handler: (data: StreamChangedEventType) => void) {
    return MobileSDK.conference.onStreamsChange(handler);
  }

  public static onPermissionsChange(handler: (data: PermissionsUpdatedEventType) => void) {
    return MobileSDK.conference.onPermissionsChange(handler);
  }

  public static onParticipantsChange(handler: (data: ParticipantChangedEventType) => void) {
    return MobileSDK.conference.onParticipantsChange(handler);
  }

  public static leave() {
    return MobileSDK.conference.leave();
  }

  public static stopRemoteVideo(participant: Participant) {
    return MobileSDK.video.getRemote().stop(participant);
  }

  public static startRemoteVideo(participant: Participant) {
    return MobileSDK.video.getRemote().start(participant);
  }

  public static stopRemoteAudio(participant: Participant) {
    return MobileSDK.audio.getRemote().stop(participant);
  }

  public static startRemoteAudio(participant: Participant) {
    return MobileSDK.audio.getRemote().start(participant);
  }

  public static stopLocalVideo() {
    return MobileSDK.video.getLocal().stop();
  }

  public static startLocalVideo() {
    return MobileSDK.video.getLocal().start();
  }

  public static stopLocalAudio() {
    return MobileSDK.audio.getLocal().stop();
  }

  public static startLocalAudio() {
    return MobileSDK.audio.getLocal().start();
  }
}
