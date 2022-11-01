import React, { useMemo } from 'react';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import GreetingAndConferenceInfo from '../GreetingAndConferenceInfo/GreetingAndConferenceInfo';
import ParticipantsGrid from '../ParticipantsGrid/ParticipantsGrid';

import styles from './ConferenceContent.style';

type ConferenceContentProps = {
  shareURL: string;
};
const ConferenceContent = ({ shareURL }: ConferenceContentProps) => {
  const { participants, user } = useParticipants();

  const hasOnlyLocalUserInConference = useMemo(() => {
    return participants.length === 1 && participants[0].id === user?.id;
  }, [participants]);

  return (
    <View testID="ConferenceContent" style={styles.wrapper}>
      <ParticipantsGrid />
      {hasOnlyLocalUserInConference && <GreetingAndConferenceInfo shareURL={shareURL} />}
    </View>
  );
};

export default ConferenceContent;
