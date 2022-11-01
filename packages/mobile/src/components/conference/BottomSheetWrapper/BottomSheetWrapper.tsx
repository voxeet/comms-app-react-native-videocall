import { BottomSheetModalProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import styles from './BottomSheetWrapper.style';

type BottomSheetWrapperType = { children: ReactNode } & BottomSheetModalProps;

const BottomSheetWrapper = React.forwardRef<BottomSheetModal, BottomSheetWrapperType>(({ children, ...rest }, ref) => {
  const { colors } = useTheme();
  return (
    <BottomSheetModal
      ref={ref}
      backgroundStyle={{ backgroundColor: colors.grey[800] }}
      handleIndicatorStyle={{ backgroundColor: colors.grey[500] }}
      stackBehavior="push"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <View style={styles.wrapper} testID="BottomSheetWrapper">
        {children}
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheetWrapper;
