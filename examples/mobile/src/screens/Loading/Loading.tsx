import {Layout, Spinner, useToken} from '@dolbyio/comms-uikit-react-native';
import {StackActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';

import {Routes} from '../../types/routes.types';
import tokenStorage from '../../utils/tokenStorage.util';
import {validateToken} from '../../utils/validation.util';

export const Loading = ({navigation}) => {
  const {retrieveToken} = tokenStorage();
  const {setToken} = useToken();

  useEffect(() => {
    let ignore = false;
    retrieveToken().then(tok => {
      if (!ignore) {
        if (tok !== null && validateToken(tok)) {
          setToken(tok);
          navigation.dispatch(StackActions.replace(Routes.Home));
        } else {
          navigation.dispatch(StackActions.replace(Routes.DemoToken));
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout testID="OnboardingScreen">
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner testID="loader" />
      </View>
    </Layout>
  );
};
