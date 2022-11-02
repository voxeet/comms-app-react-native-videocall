import React from 'react';

import useConference from '../../../hooks/useConference';
import IconButton from '../../ui/IconButton/IconButton';

const MuteAllParticipantsButton = () => {
  const { isPageMuted, toggleMuteParticipants } = useConference();

  return (
    <IconButton
      icon={isPageMuted ? 'speakerOff' : 'speaker'}
      backgroundColor={isPageMuted ? 'white' : 'grey.600'}
      iconColor={isPageMuted ? 'primary.500' : 'white'}
      onPress={toggleMuteParticipants}
      testID="MuteAllParticipantsButton"
    />
  );
};

export default MuteAllParticipantsButton;
