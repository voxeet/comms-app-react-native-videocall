import React, { useState } from 'react';
import { Modal, View } from 'react-native';

import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Text from '../Text/Text';

import styles from './InfoModal.style';

export type InfoModalProps = {
  variant?: 'success' | 'warning';
  text: string;
  testID?: string;
};

const InfoModal = ({ variant, text, testID }: InfoModalProps) => {
  const [modalVisible, setModalVisible] = useState(true);

  const getIconName = () => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      testID={testID}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.container}>
        <Icon name={getIconName()} />
        <Text>{text}</Text>
        <IconButton
          icon="close"
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default InfoModal;
