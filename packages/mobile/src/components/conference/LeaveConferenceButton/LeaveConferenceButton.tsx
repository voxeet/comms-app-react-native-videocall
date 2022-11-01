import React from 'react';

import useConference from '../../../hooks/useConference';
import IconButton from '../../ui/IconButton/IconButton';

const LeaveConferenceButton = ({ navigateTo }: NavigateTo) => {
  const { leaveConference } = useConference();

  const handleLeaveConference = async () => {
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
