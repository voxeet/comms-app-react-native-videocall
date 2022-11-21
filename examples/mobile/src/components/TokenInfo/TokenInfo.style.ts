import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  infoModalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContentWrapper: {
    flexDirection: 'row',
    borderRadius: 6,
    width: 320,
  },
  verticalSpacer: {height: 8},
  horizontalSpacer: {width: 8},
  closeButtonWrapper: {alignSelf: 'flex-start'},
});
export default styles;
