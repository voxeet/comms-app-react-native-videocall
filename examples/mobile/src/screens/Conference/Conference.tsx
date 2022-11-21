import {
  Layout,
  useConference,
  ActionBar,
  ConferenceContent,
  TopActionBar,
  useToken,
  RecordingActionBar,
  useRecording,
  Toast,
} from '@dolbyio/comms-uikit-react-native';
import {Status} from '@dolbyio/comms-uikit-react-native/src/types/status';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, View, LayoutChangeEvent} from 'react-native';

import {Routes} from '../../types/routes.types';
import {getShareURL} from '../../utils/share.util';

import styles from './Conference.style';

export const Conference = ({route, navigation}) => {
  const {userName, meetingName, meetingOwner} = route.params;
  const {token} = useToken();
  const {conference, setIsConferenceOwner} = useConference();
  const {isRecordingModeActive, stopRecording, isError, status} =
    useRecording();
  const [toastVisible, setToastVisible] = useState(false);
  const [isListeningRecordCompletion, setIsListeningRecordCompletion] =
    useState(false);
  const intl = useIntl();
  const [screenHeight, setScreenHeight] = useState(0);
  const [conferenceContentBottomPosition, setConferenceContentBottomPosition] =
    useState(0);
  const [conferenceContentBottomOffset, setConferenceContentBottomOffset] =
    useState(0);

  useEffect(() => {
    switch (status) {
      case Status.Loading:
        setIsListeningRecordCompletion(true);
        break;
      default:
        break;
    }
    if (isRecordingModeActive === false && isListeningRecordCompletion) {
      setToastVisible(true);
      setIsListeningRecordCompletion(false);
    }
  }, [isRecordingModeActive, status]);

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

  const onConferenceContentLayout = (event: LayoutChangeEvent) => {
    const {y, height} = event.nativeEvent.layout;
    setConferenceContentBottomPosition(y + height);
  };

  const onScreenLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setScreenHeight(height);
  };

  useEffect(() => {
    setConferenceContentBottomOffset(
      screenHeight - conferenceContentBottomPosition - 15,
    );
  }, [screenHeight, conferenceContentBottomPosition]);

  return (
    <View onLayout={onScreenLayout} style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Layout testID="ConferenceScreen">
          {
            (
              <SafeAreaView style={styles.wrapper}>
                {conference && (
                  <>
                    <TopActionBar title={conference.alias ?? ''} />
                    {isRecordingModeActive && <RecordingActionBar />}
                    <View
                      onLayout={onConferenceContentLayout}
                      style={styles.wrapper}>
                      <ConferenceContent shareURL={shareURL} />
                    </View>
                    <ActionBar
                      leaveConferenceNav={() => {
                        if (isRecordingModeActive) handleStopRecording();
                        navigation.dispatch(
                          StackActions.replace(Routes.ConferenceLeft, {
                            userName,
                            meetingName,
                          }),
                        );
                      }}
                      moreOptionsNav={() =>
                        navigation.navigate(Routes.SelectTheme)
                      }
                      shareURL={shareURL}
                    />
                  </>
                )}
              </SafeAreaView>
            ) as any
          }
        </Layout>
        <Toast
          variant={isError ? 'error' : 'success'}
          text={
            isError
              ? intl.formatMessage({id: 'messageRecordingFailed'})
              : intl.formatMessage({id: 'messageRecordingSuccessful'})
          }
          visible={toastVisible}
          offset={conferenceContentBottomOffset}
          onClose={() => {
            setToastVisible(false);
          }}
        />
      </BottomSheetModalProvider>
    </View>
  );
};
