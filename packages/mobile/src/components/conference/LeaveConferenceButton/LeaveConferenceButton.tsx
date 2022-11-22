import React from 'react';

import useConference from '../../../hooks/useConference';
import useRecording from '../../../hooks/useRecording';
import IconButton from '../../ui/IconButton/IconButton';

const LeaveConferenceButton = ({ navigateTo }: NavigateTo) => {
  const { leaveConference } = useConference();
  const { isRecordingModeActive, stopRecording } = useRecording();

  const handleStopRecording = async () => {
    const result = await stopRecording();
    if (!result) {
      // eslint-disable-next-line no-console
      console.log('Failed to stop recording');
    }
  };

  const handleLeaveConference = async () => {
    if (isRecordingModeActive) handleStopRecording();
    await leaveConference();
    navigateTo();
  };

  return (
    <IconButton
      onPress={handleLeaveConference}
      testID="LeaveConferenceButton"
      variant="rectangular"
      icon="handset"
      backgroundColor="red.500"
    />
  );
};

export default LeaveConferenceButton;
