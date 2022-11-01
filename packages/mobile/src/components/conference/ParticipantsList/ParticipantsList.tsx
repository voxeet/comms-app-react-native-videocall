import { Participant as ParticipantType } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React from 'react';
import { FlatList, View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import ParticipantsListItem from '../ParticipantsListItem/ParticipantsListItem';

import styles from './ParticipantsList.style';

const ParticipantsList = () => {
  const { participants } = useParticipants();

  const renderItem = ({ item }: { item: ParticipantType }) => {
    return <ParticipantsListItem participant={item} />;
  };

  return (
    <View testID="ParticipantsList" style={styles.wrapper}>
      <FlatList data={participants} renderItem={renderItem} keyExtractor={(item) => item.id} numColumns={1} />
    </View>
  );
};

export default ParticipantsList;
