import {
  Layout,
  Text,
  Input,
  ValidationType,
  JoinConferenceButton,
  JoinConferenceRoute,
} from '@dolbyio/comms-uikit-react-native';
import useTheme from '@dolbyio/comms-uikit-react-native/src/hooks/useTheme';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ConferenceCreateFooter from '../../components/Footer';
import {Routes} from '../../types/routes.types';
import {isValidMeetingTitle} from '../../utils/validation.util';
import {ConferenceType} from '../Home/Home';

import makeStyles from './MeetingNameInput.style';

export const MeetingNameInput = ({route, navigation}) => {
  const intl = useIntl();
  const MINIMUM_MEETINGNAME_LENGTH = 2;
  const {userName, conferenceType} = route.params;
  const {theme} = useTheme();

  const [meetingName, setMeetingName] = useState<string>('');
  const [validation, setValidation] = useState<ValidationType>({valid: true});

  const onChangeText = (text: string) => {
    validateInput(text);
    setMeetingName(text);
  };

  const validateInput = (value: string) => {
    const valid = isValidMeetingTitle(value, MINIMUM_MEETINGNAME_LENGTH);
    setValidation(
      value.length && value.length >= MINIMUM_MEETINGNAME_LENGTH
        ? {
            valid,
            message: valid
              ? undefined
              : intl.formatMessage({id: 'enterValidMeetingTitleMessage'}),
          }
        : {valid: true},
    );
  };
  const styles = makeStyles();
  const meetingNameHint =
    conferenceType === ConferenceType.Join
      ? 'enterMeetingNameTextForJoin'
      : 'enterMeetingNameForCreate';
  const meetingNameInputLabel = intl.formatMessage({
    id: 'meetingNameInputLabel',
  });
  const joinConferenceRoute: JoinConferenceRoute = {
    userName,
    meetingName,
    withAudio: true,
    withVideo: true,
  };
  return (
    <Layout testID="MeetingNameInput">
      <SafeAreaView style={styles.wrapper}>
        <ScrollView>
          <View style={{paddingTop: 48}} />
          <Text
            id="enterMeetingNameWelcomeFormat"
            values={{userName}}
            type="h2"
            align="center"
          />
          <View style={{paddingTop: 8}} />
          <Text
            id={meetingNameHint}
            type="h4"
            align="center"
            color="grey.500"
          />
          <View style={{paddingTop: 24}} />
          <Input
            value={meetingName}
            label={meetingNameInputLabel}
            labelBackground={theme.colors.background}
            textColor="white"
            onChangeText={onChangeText}
            validation={validation}
            autoFocus
          />
          <View style={{paddingTop: 36}} />
          <JoinConferenceButton
            title="next"
            type="primary"
            disabled={
              !(
                validation.valid &&
                meetingName.length >= MINIMUM_MEETINGNAME_LENGTH
              )
            }
            onSuccess={() => {
              navigation.navigate(Routes.Conference, {userName, meetingName});
            }}
            route={joinConferenceRoute}
          />
        </ScrollView>
      </SafeAreaView>
      <ConferenceCreateFooter />
    </Layout>
  );
};
