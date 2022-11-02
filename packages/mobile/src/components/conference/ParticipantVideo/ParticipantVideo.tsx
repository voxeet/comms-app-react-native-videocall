import { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useMemo } from 'react';

import useParticipants from '../../../hooks/useParticipants';
import Avatar from '../../ui/Avatar/Avatar';
import VideoView from '../VideoView/VideoView';

type ParticipantVideoProps = {
  participant: Participant;
  size: number | string;
};

const ParticipantVideo = ({ participant, size }: ParticipantVideoProps) => {
  const { participants } = useParticipants();

  const avatarSize = useMemo(() => {
    return participants.length <= 4 ? 'l' : 'm';
  }, [participants]);

  return (
    <VideoView
      participant={participant}
      width={size}
      height={size}
      scaleType="fill"
      noVideoFallback={<Avatar participant={participant} size={avatarSize} />}
    />
  );
};

export default ParticipantVideo;
