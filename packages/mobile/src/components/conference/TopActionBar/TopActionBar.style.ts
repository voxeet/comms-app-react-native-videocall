import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  item: {
    margin: 8,
  },
  centerItem: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingBottom: 3,
    flexShrink: 1,
  },
});

export default styles;
