import {
  Layout,
  Button,
  Text,
  Input,
  ValidationType,
  JoinConferenceButton,
  useToken,
} from '@dolbyio/comms-uikit-react-native';
import useTheme from '@dolbyio/comms-uikit-react-native/src/hooks/useTheme';
import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ConferenceCreateFooter from '../../components/Footer';
import {Routes} from '../../types/routes.types';
import {isValidUserName} from '../../utils/validation.util';
import {ConferenceType} from '../Home/Home';

import makeStyles from './UserNameInput.style';

export const UserNameInput = ({route, navigation}) => {
  const {id: meetingName, token} = route.params;

  const {setToken} = useToken();
  const intl = useIntl();
  const MINIMUM_USERNAME_LENGTH = 3;
  const [userName, setUserName] = useState<string>('');
  const [validation, setValidation] = useState<ValidationType>({valid: true});
  const {conferenceType} = route.params;
  const {theme} = useTheme();

  if (token !== undefined && token !== null) {
    setToken(route.params.token);
  }

  const onChangeText = (text: string) => {
    validateInput(text);
    setUserName(text);
  };

  const validateInput = (value: string) => {
    const valid = isValidUserName(value, MINIMUM_USERNAME_LENGTH);
    setValidation(
      value.length && value.length >= MINIMUM_USERNAME_LENGTH
        ? {
            valid,
            message: valid
              ? undefined
              : intl.formatMessage({id: 'enterValidUserNameMessage'}),
          }
        : {valid: true},
    );
  };

  const handleClick = () => {
    return meetingName
      ? navigation.dispatch(
          StackActions.replace(Routes.Conference, {
            userName,
            meetingName,
            meetingOwner: false,
          }),
        )
      : navigation.navigate(Routes.MeetingNameInput, {
          userName,
          conferenceType,
          title,
        });
  };

  const styles = makeStyles();
  const title =
    conferenceType === ConferenceType.Join
      ? intl.formatMessage({id: 'titleJoinAMeeting'})
      : intl.formatMessage({id: 'titleCreateAMeeting'});
  const userNameInputLabel = intl.formatMessage({
    id: 'userNameInputLabel',
  });

  const disabled = (validation, userName) => {
    return !(validation.valid && userName.length >= MINIMUM_USERNAME_LENGTH);
  };

  return (
    <Layout testID="UserNameInput">
      <SafeAreaView style={styles.wrapper}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{paddingTop: 48}} />
          <Text id="enterUserName" type="h2" align="center" />
          <View style={{paddingTop: 8}} />
          <Text
            id="enterUserNameClause"
            type="h4"
            align="center"
            color="grey.500"
          />
          <View style={{paddingTop: 24}} />
          <Input
            value={userName}
            label={userNameInputLabel}
            labelBackground={theme.colors.background}
            textColor="white"
            onChangeText={onChangeText}
            validation={validation}
            autoFocus
          />
          <View style={{paddingTop: 36}} />
          {meetingName ? (
            <JoinConferenceButton
              title="next"
              type="primary"
              disabled={disabled(validation, userName)}
              onSuccess={handleClick}
              route={{
                userName,
                meetingName,
                withAudio: true,
                withVideo: true,
              }}
            />
          ) : (
            <Button
              title="next"
              type="primary"
              disabled={disabled(validation, userName)}
              onPress={handleClick}
            />
          )}
        </ScrollView>
      </SafeAreaView>
      <ConferenceCreateFooter />
    </Layout>
  );
};
