/* eslint-disable react/jsx-props-no-spreading */
import type { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import useTheme from '../../../hooks/useTheme';
import Pill from '../../ui/Pill/Pill';
import Text from '../Text/Text';

type ParticipantNameProps = {
  type: 'pill' | 'label';
  participant: Participant;
  isSpeaking: boolean;
  isMuted: boolean;
};

const ParticipantName = ({ participant, isSpeaking, isMuted, type }: ParticipantNameProps) => {
  const { user } = useParticipants();
  const intl = useIntl();
  const { colors } = useTheme();

  const isLocalUser = () => {
    return participant.id === user?.id;
  };

  return type === 'pill' ? (
    <Pill
      testID="ParticipantName"
      text={participant.info.name}
      subtitleText={isLocalUser() ? intl.formatMessage({ id: 'localYou' }) : ''}
      active={isSpeaking && !isMuted}
    />
  ) : (
    <View testID="ParticipantName" style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flexShrink: 1 }}>
        <Text type="bodyDefault" color={colors.grey[100]} numberOfLines={1}>
          {participant.info.name}
        </Text>
      </View>
      {isLocalUser() ? (
        <View>
          <Text type="bodyDefault" color={colors.grey[100]} numberOfLines={1}>
            {' '}
            {intl.formatMessage({ id: 'localYou' })}
          </Text>
        </View>
      ) : null}
      <View style={{ width: 10 }} />
    </View>
  );
};

export default ParticipantName;
