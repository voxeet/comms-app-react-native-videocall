import {
  Layout,
  TokenTab,
  Text,
  useToken,
} from '@dolbyio/comms-uikit-react-native';
import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {LayoutChangeEvent, Linking, SafeAreaView, View} from 'react-native';

import {ConferenceCreateHeader} from '../../components/ConferenceCreateHeader/ConferenceCreateHeader';
import Footer from '../../components/Footer';
import {TokenInfo} from '../../components/TokenInfo/TokenInfo';
import {Routes} from '../../types/routes.types';
import tokenStorage from '../../utils/tokenStorage.util';
import {validateToken} from '../../utils/validation.util';
import InputToken from '../InputToken';
import ScanToken from '../ScanToken';
import styles from './DemoToken.style';

export const DemoToken = ({navigation}) => {
  const {storeToken} = tokenStorage();
  const {setToken} = useToken();
  const [switchTab, setSwtichTab] = useState<boolean>(true);
  const [showError, setError] = useState<boolean>(false);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [infoIconHeight, setInfoIconHeight] = useState(0);

  const onToken = (token: string) => {
    if (token === '') {
      setError(false);
      return;
    }

    if (validateToken(token)) {
      setError(false);
      storeToken(token);
      setToken(token);
      navigation.dispatch(StackActions.replace(Routes.Home));
    } else {
      setError(true);
    }
  };

  const onClear = () => {
    setError(false);
  };

  const onTabChange = (index: number) => {
    setError(false);
    setSwtichTab(index === 0);
  };

  const onTapBarLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setTopBarHeight(height);
  };

  const onInfoIconLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setInfoIconHeight(height);
  };

  return (
    <Layout>
      <SafeAreaView style={styles.wrapper}>
        <View onLayout={onTapBarLayout}>
          <ConferenceCreateHeader />
          <View
            style={[
              styles.infoIconWrapper,
              {top: (topBarHeight - infoIconHeight) / 2},
            ]}
            onLayout={onInfoIconLayout}>
            <TokenInfo />
          </View>
        </View>
        <Text type="h2" align="center" color="white" style={{paddingTop: 40}}>
          Provide a demo token
        </Text>
        <Text align="center" style={{paddingTop: 8, paddingBottom: 24}}>
          <Text
            id="provideTokenDescription"
            type="paragraph"
            align="center"
            color="secondary.200"
            style={{paddingTop: 8}}
          />
          <Text
            id="dolbyIODashboard"
            type="paragraph"
            align="center"
            color="purple.400"
            style={{paddingTop: 8}}
            onPress={() => {
              return Linking.openURL('https://dashboard.dolby.io/');
            }}
          />
          <Text
            type="paragraph"
            align="center"
            color="secondary.200"
            style={{paddingTop: 8, paddingBottom: 24}}>
            .
          </Text>
        </Text>
        <TokenTab onSelectionChange={onTabChange} />
        <View style={{height: 40}} />
        {switchTab ? (
          <ScanToken onToken={onToken} />
        ) : (
          <InputToken onToken={onToken} onClear={onClear} error={showError} />
        )}
        {showError && (
          <Text
            type="captionRegular"
            align="center"
            color="infoError"
            style={{paddingTop: 8}}>
            The demo token is invalid or has expired. Please verify.
          </Text>
        )}
      </SafeAreaView>
      <Footer />
    </Layout>
  );
};
