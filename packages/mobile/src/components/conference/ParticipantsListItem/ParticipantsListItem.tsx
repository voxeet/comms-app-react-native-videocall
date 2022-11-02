import type { Participant as ParticipantType } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React from 'react';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import useTheme from '../../../hooks/useTheme';
import Avatar from '../../ui/Avatar/Avatar';
import LocalToggleAudioButton from '../LocalToggleAudioButton/LocalToggleAudioButton';
import ParticipantName from '../ParticipantName/ParticipantName';
import ParticipantToggleAudioButton from '../ParticipantToggleAudioButton/ParticipantToggleAudioButton';

import styles from './ParticipantsListItem.style';

type ParticipantProps = {
  participant: ParticipantType;
};

const ParticipantsListItem = ({ participant }: ParticipantProps) => {
  const { getColor } = useTheme();
  const { user } = useParticipants();
  const isLocal = participant.id === user?.id;

  return (
    <View>
      <View style={[styles.container]}>
        <View style={[styles.iconAndtext]}>
          <Avatar size="s" participant={participant} />
          <View style={{ width: 16 }} />
          <ParticipantName type="label" participant={participant} isSpeaking={false} isMuted={false} />
        </View>
        {isLocal ? <LocalToggleAudioButton /> : <ParticipantToggleAudioButton participant={participant} />}
      </View>
      <View style={{ height: 1, paddingLeft: 20, paddingRight: 20, backgroundColor: getColor('grey.700') }} />
    </View>
  );
};

export default ParticipantsListItem;
