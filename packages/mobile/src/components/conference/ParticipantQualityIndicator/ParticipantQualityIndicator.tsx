import React from 'react';

import QualityIndicator from '../../ui/Indicators/QualityIndicator/QualityIndicator';

type QualityLevel = -1 | 1 | 2 | 3 | 4 | 5;

type ParticipantQualityIndicatorProps = {
  qualityLevel: QualityLevel;
};

const ParticipantQualityIndicator = ({ qualityLevel }: ParticipantQualityIndicatorProps) => {
  return <QualityIndicator testID="ParticipantQualityIndicator" qualityLevel={qualityLevel} />;
};

export default ParticipantQualityIndicator;
