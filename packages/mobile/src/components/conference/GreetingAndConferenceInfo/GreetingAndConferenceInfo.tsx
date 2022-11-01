import React from 'react';
import { View } from 'react-native';

import ConferenceInfo from '../ConferenceInfo/ConferenceInfo';
import ShareConference from '../ShareConference/ShareConference';
import Text from '../Text/Text';

import styles from './GreetingAndConferenceInfo.style';

type GreetingAndConferenceInfoProps = {
  shareURL: string;
};

const GreetingAndConferenceInfo = ({ shareURL }: GreetingAndConferenceInfoProps) => {
  return (
    <View testID="GreetingAndConferenceInfo" style={[styles.wrapper]}>
      <View style={[styles.greetingInfoWrapper]}>
        <Text id="firstToArriveTitle" testID="GreetingTitleText" type="h2" />
        <Text id="firstToArriveSubtitle" testID="GreetingSubtitleText" type="bodyDefault" />
      </View>

      <View style={[styles.conferenceInfoWrapper]}>
        <ConferenceInfo />
      </View>

      <ShareConference testID="ShareButton" url={shareURL} />
    </View>
  );
};

export default GreetingAndConferenceInfo;
