import type { Status as RecordingStatus } from './status';

export type Recording = {
  /**
   * Starts recording.
   */
  startRecording: () => Promise<boolean>;

  /**
   * Stops recording.
   */
  stopRecording: () => Promise<boolean>;

  /**
   * ID of the participant who is recording.
   */
  ownerId: string | null;

  /**
   * The number of seconds from the start of recording.
   */
  timestamp: number | null;

  /**
   * Informs if local user is recording owner.
   */
  isLocalUserRecordingOwner: boolean;

  /**
   * Status of the recording.
   */
  status: RecordingStatus;

  /**
   * Resets recording data for local user.
   */
  resetRecordingData: () => void;

  /**
   * Informs if local user has active recording mode.
   */
  isRecordingModeActive: boolean;
};

export type UseRecording = () => Recording;
