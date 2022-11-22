import {
  Button,
  Layout,
  RejoinConferenceButton,
  Text,
  useSession,
} from '@dolbyio/comms-uikit-react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useIntl} from 'react-intl';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Routes} from '../../types/routes.types';

import styles from './ConferenceLeft.style';

export const ConferenceLeft = ({route, navigation}) => {
  const {userName, meetingName} = route.params;
  const {closeSession} = useSession();
  const intl = useIntl();

  const handleGoToHome = async () => {
    closeSession();
    navigation.dispatch(StackActions.replace(Routes.Home));
  };
  return (
    <Layout testID="ConferenceLeftScreen">
      <SafeAreaView style={styles.wrapper}>
        <Text
          id="meetingLeft"
          testID="LeftMeetingTitle"
          align="center"
          style={styles.text}
          type="h1"
        />

        <Button
          testID="ReturnToHomeButton"
          title={intl.formatMessage({id: 'returnToHome'})}
          onPress={() => {
            handleGoToHome();
          }}
          type="primary"
        />
        <View style={styles.gap} />
        <RejoinConferenceButton
          title={intl.formatMessage({id: 'rejoin'})}
          userName={userName}
          meetingName={meetingName}
          testID="RejoinButton"
          type="secondary"
          onSuccess={() =>
            navigation.dispatch(
              StackActions.replace(Routes.Conference, {
                userName,
                meetingName,
                meetingOwner: false,
              }),
            )
          }
        />
      </SafeAreaView>
    </Layout>
  );
};
