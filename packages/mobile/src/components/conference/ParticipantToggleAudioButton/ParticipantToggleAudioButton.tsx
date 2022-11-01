import type { Participant as ParticipantType } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useState } from 'react';

import useParticipants from '../../../hooks/useParticipants';
import IconButton from '../../ui/IconButton/IconButton';

type ParticipantProps = {
  participant: ParticipantType;
};

const ParticipantToggleAudioButton = ({ participant }: ParticipantProps) => {
  const { muteParticipant, participantsIsMuted } = useParticipants();
  const [isMuted, setIsMuted] = useState(participantsIsMuted[participant.id]);

  const mute = () => {
    muteParticipant(participant, true);
    setIsMuted(true);
  };

  const unmute = () => {
    muteParticipant(participant, false);
    setIsMuted(false);
  };

  return (
    <IconButton
      icon={isMuted ? 'speakerOff' : 'speaker'}
      backgroundColor={isMuted ? 'white' : 'grey.600'}
      iconColor={isMuted ? 'primary.500' : 'white'}
      onPress={isMuted ? unmute : mute}
      testID="ParticipantToggleAudioButton"
    />
  );
};

export default ParticipantToggleAudioButton;
