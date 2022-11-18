import {
  Layout,
  Button,
  Text,
  useToken,
  Icon,
} from '@dolbyio/comms-uikit-react-native';
import {StackActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppIcons from '../../components/AppIcons';
import WelcomeFooter from '../../components/WelcomeFooter';
import {Routes} from '../../types/routes.types';
import tokenStorage from '../../utils/tokenStorage.util';
import {validateToken} from '../../utils/validation.util';

import makeStyles from './Welcome.style';

export const Welcome = ({navigation}) => {
  const {retrieveToken} = tokenStorage();
  const {token, setToken} = useToken();

  useEffect(() => {
    retrieveToken().then(retrievedToken => {
      if (retrievedToken !== null && validateToken(retrievedToken)) {
        setToken(retrievedToken);
      }
    });
  }, []);

  const intl = useIntl();
  const styles = makeStyles();
  return (
    <Layout testID="WelcomeScreen">
      <SafeAreaView style={styles.wrapper}>
        <ScrollView>
          <View style={styles.content}>
            <Icon name="welcome" path={AppIcons.welcomeDark} size="l" />
          </View>
          <Text
            id="welcome"
            type="h1"
            align="center"
            style={{paddingTop: 16}}
          />
          <Text
            id="welcomeDescription"
            type="paragraph"
            align="center"
            style={{paddingTop: 8}}
          />
          <View style={{paddingTop: 24}} />
          <Button
            title={intl.formatMessage({id: 'letsBegin'})}
            type="primary"
            onPress={() => {
              if (token !== null) {
                navigation.dispatch(StackActions.replace(Routes.Home));
              } else {
                navigation.dispatch(StackActions.replace(Routes.DemoToken));
              }
            }}
          />
        </ScrollView>
      </SafeAreaView>
      <WelcomeFooter />
    </Layout>
  );
};
