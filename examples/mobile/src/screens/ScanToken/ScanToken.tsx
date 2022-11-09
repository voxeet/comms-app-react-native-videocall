import {Button, Input, Text} from '@dolbyio/comms-uikit-react-native';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export type InputTokenProps = {
  onToken: (token: string) => void;
};

export const ScanToken = ({onToken}: InputTokenProps) => {
  const onSuccess = (e: BarCodeReadEvent) => {
    onToken(e.data);
  };

  const height = 280;
  const width = Platform.OS === 'android' ? 240 : 280;
  const gap = Platform.OS === 'android' ? height + 30 : height + 16;
  return (
    <View>
      <QRCodeScanner
        cameraStyle={{width, height, alignSelf: 'center'}}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        reactivate
        reactivateTimeout={3000}
      />
      <Text
        type="caption"
        align="center"
        color="secondary.200"
        style={{paddingTop: gap}}>
        Point the camera at the QR code
      </Text>
    </View>
  );
};
