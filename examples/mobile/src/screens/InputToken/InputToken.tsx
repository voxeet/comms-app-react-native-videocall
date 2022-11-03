import {Button, Input, Text} from '@dolbyio/comms-uikit-react-native';
import React, {useState} from 'react';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {ScrollView} from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';

export type InputTokenProps = {
  setToken: (token: string) => void;
};

export const InputToken = ({route}) => {
  const {setToken} = route.params;
  const [newTokenValue, setNewTokenValue] = useState('');

  const onSuccess = (e: BarCodeReadEvent) => {
    setNewTokenValue(e.data);
    console.log(`data: ${e.data}`);
    setToken(e.data);
  };
  return (
    <ScrollView>
      <Text />
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
      <Input
        value={newTokenValue}
        label="token"
        labelBackground="white"
        textColor="black"
        onChangeText={value => setNewTokenValue(value)}
      />
      <Button
        title="next"
        onPress={() => setToken(newTokenValue)}
        type="primary"
      />
      <Text />
    </ScrollView>
  );
};
