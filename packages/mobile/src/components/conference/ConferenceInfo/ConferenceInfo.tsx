import React from 'react';
import { View } from 'react-native';

import useConference from '../../../hooks/useConference';
import Text from '../Text/Text';

const ConferenceInfo = () => {
  const { conference } = useConference();

  return (
    <View>
      <Text id="conferenceIDHeader" testID="ConferenceIDTitleText" type="h4" />
      <Text testID="ConferenceIDText" type="bodySmall">
        {conference.alias}
      </Text>
    </View>
  );
};

export default ConferenceInfo;
