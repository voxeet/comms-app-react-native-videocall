// eslint-disable-next-line import/no-extraneous-dependencies
import type { ConferenceJoinOptions } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useState } from 'react';

import useConference from '../../../hooks/useConference';
import useSession from '../../../hooks/useSession';
import Button, { ButtonMode } from '../../ui/Button/Button';

export type JoinConferenceRoute = {
  userName: string;
  meetingName: string;
  withAudio: boolean;
  withVideo: boolean;
};

export type JoinButtonProps = {
  title: string;
  type: 'primary' | 'secondary' | 'secondaryDark';
  disabled?: boolean;
  route: JoinConferenceRoute;
  onSuccess: () => void;
};

const JoinConferenceButton = ({ title, type, disabled = false, route, onSuccess }: JoinButtonProps) => {
  const { openSession } = useSession();

  const { createConference, joinConference, initialize, micPermissions } = useConference();

  const [mode, setMode] = useState(ButtonMode.Default);

  const handleJoinConference = async () => {
    setMode(ButtonMode.Loading);
    try {
      await initialize();

      if (!micPermissions) throw new Error('Microphone permission not granted');

      await openSession({
        name: route.userName,
      });

      const newConference = await createConference({
        alias: route.meetingName,
      });

      const joinOptions: ConferenceJoinOptions = {
        constraints: {
          audio: route.withAudio,
          video: route.withVideo,
        },
      };

      await joinConference(newConference, joinOptions);

      setMode(ButtonMode.Done);
      onSuccess();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error during joining: ${error}`);
      setMode(ButtonMode.Default);
    }
  };

  return (
    <Button
      title={title}
      testID="JoinButton"
      type={type}
      disabled={disabled}
      onPress={handleJoinConference}
      mode={mode}
    />
  );
};

export default JoinConferenceButton;
