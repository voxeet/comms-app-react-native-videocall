import React from 'react';

import useCamera from '../../../hooks/useCamera';
import useConference from '../../../hooks/useConference';
import IconButton from '../../ui/IconButton/IconButton';

const SwitchCamera = () => {
  const { cameraPermissions } = useConference();
  const { switchCamera } = useCamera();
  return (
    <IconButton disabled={!cameraPermissions} testID="SwitchCameraButton" icon="cameraReverse" onPress={switchCamera} />
  );
};

export default SwitchCamera;
