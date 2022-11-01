import React from 'react';

import useConference from '../../../hooks/useConference';
import useParticipants from '../../../hooks/useParticipants';
import IconButton from '../../ui/IconButton/IconButton';

const ToggleVideoButton = () => {
  const { isVideo, toggleVideo, user } = useParticipants();
  const { cameraPermissions } = useConference();

  return (
    <IconButton
      disabled={!user || !cameraPermissions}
      testID="ToggleVideoButton"
      backgroundColor={isVideo ? 'grey.600' : 'white'}
      iconColor={isVideo ? 'white' : 'primary.500'}
      icon={isVideo ? 'camera' : 'cameraOff'}
      onPress={toggleVideo}
    />
  );
};

export default ToggleVideoButton;
