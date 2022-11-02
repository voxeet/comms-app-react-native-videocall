import React from 'react';
import { View } from 'react-native';

import Timer from '../../ui/Timer/Timer';
import MuteAllParticipantsButton from '../MuteAllParticipantsButton/MuteAllParticipantsButton';
import SwitchCamera from '../SwitchCamera/SwitchCamera';
import Text from '../Text/Text';

import styles from './TopActionBar.style';

type TopActionBarProps = {
  title: string;
};

const TopActionBar = ({ title }: TopActionBarProps) => {
  return (
    <View style={styles.wrapper} testID="TopActionBar">
      <View style={styles.item}>
        <SwitchCamera />
      </View>
      <View style={styles.centerItem}>
        <Text type="h7" numberOfLines={1}>
          {title}
        </Text>
        <Timer testID="Timer" />
      </View>
      <View style={styles.item}>
        <MuteAllParticipantsButton />
      </View>
    </View>
  );
};

export default TopActionBar;
