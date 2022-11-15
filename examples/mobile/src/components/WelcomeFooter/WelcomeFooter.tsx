import {Text} from '@dolbyio/comms-uikit-react-native';
import React from 'react';
import {View} from 'react-native';

import styles from './WelcomeFooter.style';

export const WelcomeFooter = () => {
  return (
    <View style={styles.wrapper}>
      <Text
        id="disclaimer"
        type="caption"
        align="center"
        color="secondary.200"
      />
    </View>
  );
};
