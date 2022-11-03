import React, { useState } from 'react';
import { View } from 'react-native';

import useTheme from '../../../hooks/useTheme';
import TabPill from '../../ui/TabPill/TabPill';

import styles from './TokenTab.style';

export type TabProps = {
  onSelectionChange: (index: number) => void;
};

const Tab = ({ onSelectionChange }: TabProps) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const { colors } = useTheme();

  const onPress = (index: number) => {
    setToggle(index === 0);
    onSelectionChange(index);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.grey[100] }]}>
      <TabPill
        title="Scan"
        icon="scan"
        isFocussed={toggle}
        onPress={() => {
          onPress(0);
        }}
      />
      <TabPill
        title="Paste"
        icon="paste"
        isFocussed={!toggle}
        onPress={() => {
          onPress(1);
        }}
      />
    </View>
  );
};

export default Tab;
