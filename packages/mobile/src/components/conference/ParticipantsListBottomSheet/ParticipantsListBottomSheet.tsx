import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import BottomSheetWrapper from '../BottomSheetWrapper/BottomSheetWrapper';
import ParticipantsList from '../ParticipantsList/ParticipantsList';
import Text from '../Text/Text';

import styles from './ParticipantsListBottomSheet.style';

const ParticipantsListBottomSheet = React.forwardRef<BottomSheetModal>((_props, ref) => {
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const { participants } = useParticipants();

  return (
    <BottomSheetWrapper ref={ref} snapPoints={snapPoints}>
      <View style={styles.container} testID="ParticipantsListBottomSheet">
        <View style={styles.row}>
          <Text type="H3" id="participants" values={{ count: participants.length }} />
        </View>
        <View>
          <ParticipantsList />
        </View>
      </View>
    </BottomSheetWrapper>
  );
});

export default ParticipantsListBottomSheet;
