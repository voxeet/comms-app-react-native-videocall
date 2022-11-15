import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import IconButton from '../../ui/IconButton/IconButton';
import BottomSheetWrapper from '../BottomSheetWrapper/BottomSheetWrapper';
import ShareConference from '../ShareConference/ShareConference';
import RecordButton from '../RecordButton/RecordButton';
import Text from '../Text/Text';

import styles from './MoreBottomSheet.style';

type MoreBottomSheetProps = {
  navigateTo: () => void;
  shareURL: string;
};

const MoreBottomSheet = React.forwardRef<BottomSheetModal, MoreBottomSheetProps>(({ navigateTo, shareURL }, ref) => {
  const snapPoints = useMemo(() => ['20%'], []);

  return (
    <BottomSheetWrapper ref={ref} snapPoints={snapPoints}>
      <View style={styles.container} testID="ParticipantsListBottomSheet">
        <View style={styles.row}>
          <Text testID="MoreOptions" type="H3" id="moreOptions" />
        </View>
      </View>
      <View style={styles.row} testID="MoreBottomSheet">
        <ShareConference testID="InviteButton" type="iconButton" url={shareURL} />
        <View style={{ width: 40 }} />
        <RecordButton type={'iconButton'} />
        <View style={{ width: 40 }} />
        <IconButton testID="SettingsButton" icon="settings" onPress={() => navigateTo()} />
      </View>
    </BottomSheetWrapper>
  );
});

export default MoreBottomSheet;
