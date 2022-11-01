import React from 'react';
import { Alert, Share } from 'react-native';

import Button from '../../ui/Button/Button';
import IconButton from '../../ui/IconButton/IconButton';

type ShareConferenceType = {
  type: 'button' | 'iconButton';
  url: string;
  testID?: string;
};

const ShareConference = ({ type = 'button', url, testID }: ShareConferenceType) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: url ?? '',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // @ts-expect-error Message is in error object
      Alert.alert('', error.message);
    }
  };
  return type === 'button' ? (
    <Button testID={testID} title="Share Link" size="s" uppercase iconRight="copy" type="primary" onPress={onShare} />
  ) : (
    <IconButton testID={testID} icon="invite" onPress={onShare} />
  );
};

export default ShareConference;
