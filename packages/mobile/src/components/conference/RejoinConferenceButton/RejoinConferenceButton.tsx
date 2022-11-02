// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import useParticipants from '../../../hooks/useParticipants';
import JoinConferenceButton, { JoinConferenceRoute } from '../JoinConferenceButton/JoinConferenceButton';

export type RejoinButtonProps = {
  title: string;
  userName: string;
  meetingName: string;
  type: 'primary' | 'secondary' | 'secondaryDark';
  disabled?: boolean;
  onSuccess: () => void;
};

const RejoinConferenceButton = ({
  title,
  userName,
  meetingName,
  type,
  disabled = false,
  onSuccess,
}: RejoinButtonProps) => {
  const { isMuted, isVideo } = useParticipants();
  const withAudio = !isMuted;
  const withVideo = isVideo;
  const joinConferenceRoute: JoinConferenceRoute = { userName, meetingName, withAudio, withVideo };

  return (
    <JoinConferenceButton
      title={title}
      type={type}
      disabled={disabled}
      onSuccess={onSuccess}
      route={joinConferenceRoute}
    />
  );
};

export default RejoinConferenceButton;
