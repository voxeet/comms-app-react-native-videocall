/* eslint-disable react/jsx-props-no-spreading */
import type { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import type { ColorKey, Sizes } from '@dolbyio/comms-uikit-common';
import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import useTheme from '../../../hooks/useTheme';
import { stringToNumber } from '../../../utils/stringToNumber.util';
import Text, { TextType } from '../Text/Text';

import styles from './Avatar.style';

type AvatarSizes = Extract<Sizes, 'xs' | 's' | 'm' | 'l'>;

export type AvatarProps = ViewProps & {
  participant: Participant | string | undefined;
  size?: AvatarSizes;
  borderColor?: ColorKey;
  testID?: string;
};

const AvatarSizesMap: { [key in AvatarSizes]: { width: number; height: number; text: TextType } } = {
  xs: { width: 24, height: 24, text: 'avatarXS' },
  s: { width: 40, height: 40, text: 'avatarS' },
  m: { width: 48, height: 48, text: 'avatarM' },
  l: { width: 80, height: 80, text: 'avatarL' },
};

const Avatar = ({ participant, size = 'l', borderColor, testID, ...props }: AvatarProps) => {
  if (participant === undefined) {
    return null;
  }
  const { avatars, getColor } = useTheme();
  const name = typeof participant === 'string' ? participant : participant.info.name;

  const [firstNameLetter, lastNameLetter] = useMemo(() => {
    let firstValue;
    let lastValue;
    if (name) {
      firstValue = name.charAt(0);
      const nameArray = name.split(' ');
      lastValue = nameArray.length > 1 ? nameArray[nameArray.length - 1].charAt(0) : '';
    }
    return [firstValue, lastValue];
  }, [name]);

  // Generate random background color
  const backgroundColor = useMemo(() => avatars[stringToNumber(name) % avatars.length], [name]);
  const { width, height, text } = AvatarSizesMap[size];
  const borderRadius = width / 2;
  return (
    <View
      testID={testID}
      style={[
        styles.wrapper,
        { width, height, borderRadius, backgroundColor, borderColor: getColor(borderColor, 'white') },
      ]}
      {...props}
    >
      <Text testID={`${testID}-text`} type={text}>
        {firstNameLetter?.toUpperCase()}
        {['m', 'l'].includes(size) ? lastNameLetter?.toUpperCase() : undefined}
      </Text>
    </View>
  );
};

export default Avatar;
