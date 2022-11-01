import type { Participant as ParticipantType } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useState, useEffect, useMemo } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import useTheme from '../../../hooks/useTheme';
import ParticipantName from '../ParticipantName/ParticipantName';
import ParticipantTalkingFlag from '../ParticipantTalkingFlag/ParticipantTalkingFlag';
import ParticipantVideo from '../ParticipantVideo/ParticipantVideo';

import styles from './Participant.style';

type ParticipantProps = {
  participant: ParticipantType;
};

const Participant = ({ participant }: ParticipantProps) => {
  const { colors } = useTheme();

  const { isMuted, addIsSpeakingListener, participantsIsSpeaking, participantsIsMuted, user } = useParticipants();
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  const isParticipantMuted = useMemo(() => {
    return participant.id === user?.id ? isMuted : participantsIsMuted[participant.id] === true;
  }, [participant, user, participantsIsMuted, isMuted]);

  const isParticipantSpeaking = useMemo(() => {
    return participantsIsSpeaking[participant.id] === true;
  }, [participant, user, participantsIsSpeaking]);

  useEffect(() => {
    return addIsSpeakingListener(participant);
  }, []);

  return (
    <View style={styles.container} testID="Participant" onLayout={onLayout}>
      <ParticipantVideo participant={participant} size={width} />
      {isParticipantSpeaking && !isParticipantMuted && (
        <View style={[styles.highlightedBorder, { borderColor: colors.primary[400] }]} testID="highlightedBorder" />
      )}
      <View style={styles.nameWrapper} testID="ParticipantNameWrapper">
        <ParticipantName
          participant={participant}
          isSpeaking={isParticipantSpeaking}
          isMuted={isParticipantMuted}
          type="pill"
        />
      </View>
      <View style={styles.audioIconWrapper} testID="ParticipantAudioWrapper">
        <ParticipantTalkingFlag isSpeaking={isParticipantSpeaking} isMuted={isParticipantMuted} />
      </View>
    </View>
  );
};

export default Participant;
