import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

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
  const {
    startRecording,
    stopRecording,
    status,
    isLocalUserRecordingOwner,
    isError,
    setRecordingErrors,
    isRecordingModeActive,
  } = useRecording();

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
      console.log('Failed to start recordinhg');
    }
  };

  const handleStopRecording = async () => {
    const result = await stopRecording();
    if (!result) {
      console.log('Failed to stop recordinhg');
    }
  };

  useEffect(() => {
    if (isError || status === RecordingStatus.Error) {
      setRecordingErrors();
    }
  }, [isError, status]);

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
        disabled={status === RecordingStatus.Active && !isLocalUserRecordingOwner}
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
