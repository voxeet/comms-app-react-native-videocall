import {Text} from '@dolbyio/comms-uikit-react-native';
import React from 'react';
import {Linking, View} from 'react-native';

import styles from './WelcomeFooter.style';

export const WelcomeFooter = () => {
  return (
    <View style={styles.wrapper}>
      <Text align="center">
        <Text
          id="disclaimer"
          type="caption"
          align="center"
          color="secondary.200"
        />
        <Text
          testID="TermsOfServicesLink"
          id="termsOfServices"
          onPress={() => {
            return Linking.openURL(
              'https://dolby.io/policies/terms-of-service/',
            );
          }}
          type="captionBold"
          align="center"
          color="secondary.200"
        />
        <Text id="and" type="caption" align="center" color="secondary.200" />
        <Text
          testID="PrivacyPolicyLink"
          id="privacyPolicy"
          onPress={() => {
            return Linking.openURL('https://dolby.io/policies/privacy-policy/');
          }}
          type="captionBold"
          align="center"
          color="secondary.200"
        />
      </Text>
    </View>
  );
};
