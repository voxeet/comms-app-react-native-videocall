import {IconButton, Text, useTheme} from '@dolbyio/comms-uikit-react-native';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {View, TouchableOpacity, Modal} from 'react-native';

import styles from './TokenInfo.style';

export const TokenInfo = () => {
  const intl = useIntl();
  const [showPopover, setShowPopover] = useState(false);
  const {colors} = useTheme();

  return (
    <View>
      <IconButton
        backgroundColor="transparent"
        icon="info"
        size="m"
        iconColor="purple.300"
        onPress={() => {
          setShowPopover(true);
        }}
      />
      <Modal
        animationType="fade"
        transparent
        presentationStyle="overFullScreen"
        visible={showPopover}
        onRequestClose={() => {
          setShowPopover(false);
        }}>
        <View
          style={[
            styles.infoModalWrapper,
            {backgroundColor: colors.blackAlpha[700]},
          ]}>
          <View
            style={[
              styles.infoContentWrapper,
              {backgroundColor: colors.grey[700]},
            ]}>
            <View style={styles.container}>
              <Text type="captionSmallDemiBold">
                {intl.formatMessage({id: 'tokenInfoHeader'})}
              </Text>
              <View style={styles.verticalSpacer} />
              <View style={{flexDirection: 'row'}}>
                <Text type="captionSmallDemiBold">
                  {intl.formatMessage({id: 'tokenInfoStep1Title'})}
                </Text>
                <View style={styles.horizontalSpacer} />
                <Text type="captionSmallDemiBold">
                  {intl.formatMessage({id: 'tokenInfoStep1Value'})}
                </Text>
              </View>
              <View style={styles.verticalSpacer} />
              <View style={{flexDirection: 'row'}}>
                <Text type="captionSmallDemiBold">
                  {intl.formatMessage({id: 'tokenInfoStep2Title'})}
                </Text>
                <View style={styles.horizontalSpacer} />
                <Text type="captionSmallDemiBold">
                  {intl.formatMessage({id: 'tokenInfoStep2Value'})}
                </Text>
              </View>
            </View>
            <View style={styles.closeButtonWrapper}>
              <IconButton
                backgroundColor="transparent"
                icon="close"
                size="xxs"
                onPress={() => {
                  setShowPopover(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
