import {Button, Input} from '@dolbyio/comms-uikit-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';

export type InputTokenProps = {
  onToken: (token: string) => void;
};

export const InputToken = ({onToken}: InputTokenProps) => {
  const [newTokenValue, setNewTokenValue] = useState('');

  return (
    <View>
      <Input
        value={newTokenValue}
        label="Demo token"
        labelBackground="white"
        textColor="black"
        onChangeText={value => setNewTokenValue(value)}
      />
      <View style={{height: 24}} />
      <Button
        title="confirm"
        onPress={() => onToken(newTokenValue)}
        type="primary"
      />
    </View>
  );
};
