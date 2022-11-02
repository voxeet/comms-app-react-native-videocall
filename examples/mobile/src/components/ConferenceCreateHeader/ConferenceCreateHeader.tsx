import {Icon} from '@dolbyio/comms-uikit-react-native';
import useTheme from '@dolbyio/comms-uikit-react-native/src/hooks/useTheme';
import React from 'react';
import {View} from 'react-native';

import AppIcons from '../AppIcons/index';

import makeStyles from './ConferenceCreateHeader.style';

export const ConferenceCreateHeader = () => {
  const {theme} = useTheme();
  const styles = makeStyles(theme.colors);
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Icon name="dolby" path={AppIcons.dolby} />
      </View>
      <View style={styles.delimiter} />
    </View>
  );
};
