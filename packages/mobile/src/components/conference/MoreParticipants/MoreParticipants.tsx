import { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useMemo, useEffect } from 'react';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import useTheme from '../../../hooks/useTheme';
import Avatar from '../../ui/Avatar/Avatar';
import Text from '../Text/Text';

import styles from './MoreParticipants.style';

type MoreParticipantsProps = {
  participants: Participant[];
};

const MoreParticipants = ({ participants }: MoreParticipantsProps) => {
  const { colors, getColor } = useTheme();
  const { addIsSpeakingListener } = useParticipants();

  useEffect(() => {
    const removeListeners: (() => void)[] = [];
    participants.forEach((participant) => {
      const removeListener = addIsSpeakingListener(participant);
      removeListeners.push(removeListener);
    });

    return () => {
      removeListeners.forEach((removeListener) => {
        removeListener();
      });
    };
  }, []);

  const participantsToDisplay = useMemo(() => {
    // Maximum of `three` participant Avatar's are displayed on the tile
    //
    // For example - if the `more participants count` is `4` - only three Avatars are displayed on the tile, however
    // the text count will show `+4`
    return participants.slice(0, 3);
  }, [participants]);

  return (
    <View testID="MoreParticipants" style={[styles.wrapper, { backgroundColor: getColor(colors.grey[700]) }]}>
      <View testID="AvatarsGroup" style={[styles.avatarsRowWrapper]}>
        {participantsToDisplay.map((participant, rowIndex) => {
          return (
            <View testID="AvatarWrapper" key={participant.id} style={[styles.avatarWrapper, { zIndex: rowIndex }]}>
              <Avatar participant={participant} size="m" />
            </View>
          );
        })}
      </View>
      <View testID="ParticipantsCountWrapper" style={[styles.participantsCountWrapper]}>
        <Text type="captionRegular" align="center">{`+${participants.length}`}</Text>
      </View>
    </View>
  );
};

export default MoreParticipants;
