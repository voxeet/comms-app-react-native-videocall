import React from 'react';
import { Platform } from 'react-native';

import useSpeaker from '../../../hooks/useSpeaker';
import IconButton from '../../ui/IconButton/IconButton';

const SwitchSpeaker = () => {
  const { switchSpeaker } = useSpeaker();
  if (Platform.OS === 'android') {
    return null;
  }
  return <IconButton testID="SwitchSpeakerButton" icon="speaker" onPress={switchSpeaker} />;
};

export default SwitchSpeaker;
