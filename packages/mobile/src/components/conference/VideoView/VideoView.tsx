import { VideoView } from '@dolbyio/comms-sdk-react-native';
import type { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useEffect, useMemo, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';

import useConference from '../../../hooks/useConference';
import useParticipants from '../../../hooks/useParticipants';
import useTheme from '../../../hooks/useTheme';

import styles from './VideoView.style';

type VideoProps = {
  participant: Participant;
  width: number | string;
  height: number | string;
  scaleType?: 'fill' | 'fit';
  noVideoFallback?: React.ReactNode;
};

const Video = ({ participant, width, height, scaleType, noVideoFallback }: VideoProps) => {
  const { colors, getColor } = useTheme();
  const { isVideo, user } = useParticipants();
  const videoView = useRef() as React.MutableRefObject<VideoView>;
  const { cameraPermissions } = useConference();

  const isLocalUser = () => {
    return participant.id === user?.id;
  };

  const videoStream = useMemo(() => {
    if (participant.streams) {
      const videoStream = participant.streams[participant.streams.length - 1];
      return videoStream && videoStream.videoTracks.length > 0;
    }
    return false;
  }, [participant]);

  useEffect(() => {
    if (videoView?.current) {
      if (participant.streams?.length) {
        videoView.current.attach(participant, participant.streams[participant.streams.length - 1]);
      }
    }
  }, [participant]);

  return (
    <View style={[styles.videoWrapper, { height, width: '100%' }]}>
      {videoStream ? (
        <VideoView
          ref={videoView}
          style={[
            { width, height },
            { backgroundColor: getColor(colors.grey[700]), flex: 1 },
          ]}
          scaleType={scaleType}
        />
      ) : (
        <View style={[styles.fallbackWrapper, { backgroundColor: getColor(colors.grey[700]) }]}>
          {cameraPermissions && isVideo && isLocalUser() ? (
            <ActivityIndicator size="large" color={getColor('white')} />
          ) : (
            noVideoFallback || (
              <View style={[styles.fallbackContent, { backgroundColor: getColor(colors.grey[700]) }]} />
            )
          )}
        </View>
      )}
    </View>
  );
};

export default Video;
