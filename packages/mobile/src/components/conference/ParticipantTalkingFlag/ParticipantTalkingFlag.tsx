import React from 'react';

import IconIndicator from '../../ui/Indicators/IconIndicator/IconIndicator';
import SpeakingIndicator from '../../ui/Indicators/SpeakingIndicator/SpeakingIndicator';

type ParticipantTalkingFlagProps = {
  isMuted?: boolean;
  isSpeaking?: boolean;
};

const ParticipantTalkingFlag = React.memo(({ isMuted = false, isSpeaking = false }: ParticipantTalkingFlagProps) => {
  let content = <IconIndicator testID="ParticipantTalkingFlag" icon="dotsHorizontal" />;

  if (isMuted) content = <IconIndicator testID="ParticipantTalkingFlag" icon="microphoneOff" />;
  if (isSpeaking && !isMuted)
    content = <SpeakingIndicator testID="ParticipantTalkingFlag" backgroundColor="white" iconColor="primary.500" />;

  return content;
});

export default ParticipantTalkingFlag;
