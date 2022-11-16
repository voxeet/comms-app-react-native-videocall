import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    borderRadius: 6,
    flexDirection: 'row',
    paddingLeft: 13,
    paddingVertical: 8,
  },
  textStyle: {
    flexWrap: 'wrap',
    flex: 1,
  },
  spacer: {
    width: 8,
  },
});
