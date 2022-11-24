import {
  Layout,
  Button,
  Text,
  useToken,
  tokenStorage,
} from '@dolbyio/comms-uikit-react-native';
import {StackActions} from '@react-navigation/native';
import React from 'react';
import {useIntl} from 'react-intl';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ConferenceCreateHeader from '../../components/ConferenceCreateHeader';
import ConferenceCreateFooter from '../../components/Footer';
import {Routes} from '../../types/routes.types';

import makeStyles from './Home.style';

export enum ConferenceType {
  Join,
  Create,
}

export const Home = ({navigation}) => {
  const intl = useIntl();
  const styles = makeStyles();
  const {setToken} = useToken();
  const {storeToken} = tokenStorage();

  return (
    <Layout testID="ConferenceCreateJoinScreen">
      <SafeAreaView style={styles.wrapper}>
        <ConferenceCreateHeader />

        <ScrollView>
          <Text id="hello" type="h1" align="center" style={{paddingTop: 40}} />
          <Text
            id="createOrJoin"
            type="paragraph"
            align="center"
            style={{paddingTop: 8}}
          />
          <View style={{paddingTop: 32}} />
          <Button
            title="create"
            type="primary"
            onPress={() => {
              navigation.navigate(Routes.UserNameInput, {
                conferenceType: ConferenceType.Create,
                title: intl.formatMessage({id: 'titleCreateAMeeting'}),
              });
            }}
          />
          <View style={{paddingTop: 16}} />
          <Button
            title="join"
            type="secondary"
            onPress={() => {
              navigation.navigate(Routes.UserNameInput, {
                conferenceType: ConferenceType.Join,
                title: intl.formatMessage({id: 'titleJoinAMeeting'}),
              });
            }}
          />
          <View style={{paddingTop: 32}} />
          <Button
            title="logout"
            type="secondaryDark"
            onPress={() => {
              storeToken('');
              setToken('');
              navigation.dispatch(StackActions.replace(Routes.DemoToken));
            }}
          />
        </ScrollView>
      </SafeAreaView>
      <ConferenceCreateFooter />
    </Layout>
  );
};
