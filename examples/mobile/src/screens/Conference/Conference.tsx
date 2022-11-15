import {
  Layout,
  useConference,
  ActionBar,
  ConferenceContent,
  TopActionBar,
  useToken,
  RecordingActionBar,
  useRecording,
  InfoModal,
} from '@dolbyio/comms-uikit-react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {SafeAreaView, View} from 'react-native';

import {Routes} from '../../types/routes.types';
import {getShareURL} from '../../utils/share.util';

import styles from './Conference.style';

export const Conference = ({route}) => {
  const {userName, meetingName, meetingOwner} = route.params;
  const {navigate} = useNavigation();
  const {token} = useToken();
  const {conference, setIsConferenceOwner} = useConference();
  const {isRecordingModeActive, stopRecording} = useRecording();

  const shareURL = useMemo(() => {
    return getShareURL(conference?.alias ?? '', token ?? '');
  }, [conference]);

  const handleStopRecording = async () => {
    const result = await stopRecording();
    if (!result) {
      // eslint-disable-next-line no-console
      console.log('Failed to stop recording');
    }
  };

  setIsConferenceOwner(meetingOwner);

  return (
    <BottomSheetModalProvider>
      <Layout testID="ConferenceScreen">
        {
          (
            <SafeAreaView style={styles.wrapper}>
              {conference && (
                <>
                  <TopActionBar title={conference.alias ?? ''} />
                  {isRecordingModeActive && <RecordingActionBar />}
                  <View style={styles.wrapper}>
                    <ConferenceContent shareURL={shareURL} />
                  </View>
                  <ActionBar
                    leaveConferenceNav={() => {
                      if (isRecordingModeActive) handleStopRecording();
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
