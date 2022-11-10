import {
  Layout,
  useConference,
  ActionBar,
  ConferenceContent,
  TopActionBar,
  useToken,
} from '@dolbyio/comms-uikit-react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';

import {Routes} from '../../types/routes.types';
import {getShareURL} from '../../utils/share.util';

import styles from './Conference.style';

export const Conference = ({route}) => {
  const {userName, meetingName} = route.params;
  const {navigate} = useNavigation();
  const {token} = useToken();

  console.log('token >>>>', token);

  const {conference} = useConference();

  const shareURL = useMemo(() => {
    return getShareURL(conference?.alias ?? '', token ?? '');
  }, [conference]);

  return (
    <BottomSheetModalProvider>
      <Layout testID="ConferenceScreen">
        {
          (
            <SafeAreaView style={styles.wrapper}>
              {conference && (
                <>
                  <TopActionBar title={conference.alias ?? ''} />
                  <View style={styles.wrapper}>
                    <ConferenceContent shareURL={shareURL} />
                  </View>
                  <ActionBar
                    leaveConferenceNav={() => {
                      navigate(Routes.ConferenceLeft, {
                        userName,
                        meetingName,
                      });
                    }}
                    moreOptionsNav={() => navigate(Routes.SelectTheme)}
                    shareURL={shareURL}
                  />
                </>
              )}
            </SafeAreaView>
          ) as any
        }
      </Layout>
    </BottomSheetModalProvider>
  );
};
