import React from 'react';

import useConference from '../../../hooks/useConference';
import useParticipants from '../../../hooks/useParticipants';
import IconButton from '../../ui/IconButton/IconButton';

const LocalToggleAudioButton = () => {
  const { toggleMute, isMuted, user } = useParticipants();

  const { micPermissions } = useConference();

  return (
    <IconButton
      disabled={!user || !micPermissions}
      icon={isMuted ? 'microphoneOff' : 'microphone'}
      backgroundColor={isMuted ? 'white' : 'grey.600'}
      iconColor={isMuted ? 'primary.500' : 'white'}
      onPress={toggleMute}
      testID="LocalToggleAudioButton"
    />
  );
};

export default LocalToggleAudioButton;
