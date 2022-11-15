import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';

import Button from '../../ui/Button/Button';
import BottomSheetWrapper from '../BottomSheetWrapper/BottomSheetWrapper';
import Text from '../Text/Text';

import styles from './RecordBottomSheet.style';

type MoreBottomSheetProps = {
  confirm: () => void;
  cancel: () => void;
  isRecording: boolean;
};

const RecordBottomSheet = React.forwardRef<BottomSheetModal, MoreBottomSheetProps>(
  ({ confirm, cancel, isRecording }, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const intl = useIntl();
    const title = isRecording ? 'stopRecording' : 'startRecordingTitle';
    const body = isRecording ? 'stopRecordingHint' : 'startRecordingHint';

    return (
      <BottomSheetWrapper ref={ref} snapPoints={snapPoints}>
        <View style={styles.container} testID="RecordBottomSheet">
          <Text testID="RecordBottomSheetlabel" type="H3" id={title} align="center" />
          <View style={{ height: 8 }} />
          <Text testID="RecordBottomSheetlabel" type="paragraph" id={body} align="center" />
          <View style={{ height: 36 }} />
          <Button
            title={intl.formatMessage({ id: isRecording ? 'stopRecording' : 'startRecording' })}
            testID="RecordConfirmButton"
            type="primary"
            onPress={() => {
              confirm();
            }}
          />
          <View style={{ height: 16 }} />
          <Button
            title={intl.formatMessage({ id: 'cancel' })}
            testID="RecordConfirmButton"
            type="secondary"
            onPress={() => {
              cancel();
            }}
          />
        </View>
      </BottomSheetWrapper>
    );
  },
);

export default RecordBottomSheet;
