import {Button, Input} from '@dolbyio/comms-uikit-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';

export type InputTokenProps = {
  onToken: (token: string) => void;
  onClear: () => void;
  error: boolean;
};

export const InputToken = ({onToken, onClear, error}: InputTokenProps) => {
  const [newTokenValue, setNewTokenValue] = useState('');

  return (
    <View>
      <Input
        value={newTokenValue}
        label="Demo token"
        labelBackground="white"
        textColor="black"
        onChangeText={value => {
          if(value === '' ) onClear();
          setNewTokenValue(value);
        }}
        validation={{valid:!error}}
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
