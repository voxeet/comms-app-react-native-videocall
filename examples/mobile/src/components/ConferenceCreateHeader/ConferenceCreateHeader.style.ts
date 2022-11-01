// eslint-disable-next-line import/no-extraneous-dependencies
import {Colors} from '@dolbyio/comms-uikit-common';
import {StyleSheet} from 'react-native';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      margin: 15.63,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    delimiter: {
      height: 1,
      width: '100%',
      backgroundColor: colors.grey[700],
    },
  });
export default makeStyles;
