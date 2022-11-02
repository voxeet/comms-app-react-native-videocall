import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import IconButton from '../../ui/IconButton/IconButton';
import LeaveConferenceButton from '../LeaveConferenceButton/LeaveConferenceButton';
import LocalToggleAudioButton from '../LocalToggleAudioButton/LocalToggleAudioButton';
import MoreBottomSheet from '../MoreBottomSheet/MoreBottomSheet';
import ParticipantsListBottomSheet from '../ParticipantsListBottomSheet/ParticipantsListBottomSheet';
import ToggleVideoButton from '../ToggleVideoButton/ToggleVideoButton';

import styles from './ActionBar.style';

type ActionBarNav = {
  moreOptionsNav: () => void;
  leaveConferenceNav: () => void;
  shareURL: string;
};

const ActionBar = ({ leaveConferenceNav, moreOptionsNav, shareURL }: ActionBarNav) => {
  const moreBottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => moreBottomSheetRef.current?.present();

  const participantsBottomSheetRef = useRef<BottomSheetModal>(null);
  const handleParticipantsPress = () => participantsBottomSheetRef.current?.present();

  const { participants } = useParticipants();
  let badgeValue;
  if (participants.length > 0) badgeValue = participants.length;
  return (
    <>
      <View style={styles.wrapper} testID="ActionBar">
        <View style={styles.item}>
          <LeaveConferenceButton navigateTo={() => leaveConferenceNav()} />
        </View>
        <View style={styles.item}>
          <LocalToggleAudioButton />
        </View>
        <View style={styles.item}>
          <ToggleVideoButton />
        </View>
        <View style={styles.item}>
          <IconButton
            testID="ParticipantsList"
            icon="participants"
            badge={badgeValue}
            onPress={handleParticipantsPress}
          />
        </View>
        <View style={styles.item}>
          <IconButton testID="OptionsButton" icon="dotsVertical" onPress={handlePresentPress} />
        </View>
      </View>
      <MoreBottomSheet ref={moreBottomSheetRef} navigateTo={() => moreOptionsNav()} shareURL={shareURL} />
      <ParticipantsListBottomSheet ref={participantsBottomSheetRef} />
    </>
  );
};

export default ActionBar;
