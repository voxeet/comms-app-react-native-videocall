import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import useConference from '../../../hooks/useConference';
import useRecording from '../../../hooks/useRecording';
import { Status as RecordingStatus } from '../../../types/status';
import Button from '../../ui/Button/Button';
import IconButton from '../../ui/IconButton/IconButton';
import RecordBottomSheet from '../RecordBottomSheet/RecordBottomSheet';

type RecordButtonType = {
  type: 'button' | 'iconButton';
  testID?: string;
};

const RecordButton = ({ type = 'iconButton', testID }: RecordButtonType) => {
  const { startRecording, stopRecording, status, isLocalUserRecordingOwner, isRecordingModeActive } = useRecording();

  const { isConferenceOwner } = useConference();

  const recordBottomSheetRef = useRef<BottomSheetModal>(null);
  const showBottomSheet = () => recordBottomSheetRef.current?.present();
  const closeBottomSheet = () => recordBottomSheetRef.current?.close();

  const intl = useIntl();

  const toggleRecording = useCallback(async () => {
    if (status === RecordingStatus.Active && isLocalUserRecordingOwner) {
      closeBottomSheet();
      handleStopRecording();
    } else if (status === RecordingStatus.Other) {
      closeBottomSheet();
      handleStartRecording();
    }
  }, [status, isLocalUserRecordingOwner]);

  const handleStartRecording = async () => {
    const result = await startRecording();
    if (!result) {
      // eslint-disable-next-line no-console
      console.log('Failed to start recording');
    }
  };

  const handleStopRecording = async () => {
    const result = await stopRecording();
    if (!result) {
      // eslint-disable-next-line no-console
      console.log('Failed to stop recording');
    }
  };

  const isRecordingOn = useMemo(() => {
    let isActive;

    if (status === RecordingStatus.Active || isRecordingModeActive) {
      isActive = isLocalUserRecordingOwner;
    } else {
      isActive = false;
    }

    return isActive;
  }, [isLocalUserRecordingOwner, status, isRecordingModeActive]);

  return type === 'iconButton' ? (
    <>
      <IconButton
        disabled={!isConferenceOwner}
        testID="ToggleRecordButton"
        backgroundColor={isRecordingOn ? 'white' : 'grey.600'}
        iconColor={isRecordingOn ? 'primary.500' : 'white'}
        icon="record"
        onPress={showBottomSheet}
      />
      <RecordBottomSheet
        ref={recordBottomSheetRef}
        isRecording={isRecordingOn}
        confirm={toggleRecording}
        cancel={closeBottomSheet}
      />
    </>
  ) : (
    <>
      <Button title={intl.formatMessage({ id: 'stop' })} type="primary" size="xs" onPress={showBottomSheet} />
      <RecordBottomSheet
        ref={recordBottomSheetRef}
        isRecording={isRecordingOn}
        confirm={toggleRecording}
        cancel={closeBottomSheet}
      />
    </>
  );
};

export default RecordButton;
