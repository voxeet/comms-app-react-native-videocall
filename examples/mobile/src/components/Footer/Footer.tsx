import {Text} from '@dolbyio/comms-uikit-react-native';
import React from 'react';
import {View} from 'react-native';

import styles from './Footer.style';

export const Footer = () => {
  return (
    <View style={styles.wrapper}>
      <Text
        id="copyright"
        values={{year: new Date().getFullYear()}}
        type="bodySmall"
        align="center"
        color="secondary.200"
      />
    </View>
  );
};
