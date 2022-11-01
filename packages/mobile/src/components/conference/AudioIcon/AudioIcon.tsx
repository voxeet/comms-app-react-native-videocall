import React from 'react';
import { View } from 'react-native';

import useTheme from '../../../hooks/useTheme';
import Icon from '../../ui/Icon/Icon';

import styles from './AudioIcon.style';

type AudioIconProps = {
  isMuted: boolean;
};

const AudioIcon = ({ isMuted }: AudioIconProps) => {
  const { colors, getColor } = useTheme();

  return (
    <View style={[styles.fill, { backgroundColor: getColor(colors.whiteAlpha[500]) }]}>
      <Icon name={isMuted ? 'microphoneOff' : 'microphone'} size="s" color="white" testID="AudioIcon" />
    </View>
  );
};

export default AudioIcon;
