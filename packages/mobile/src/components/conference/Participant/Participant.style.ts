import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  highlightedBorder: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 3,
    ...StyleSheet.absoluteFillObject,
  },
  nameWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingBottom: 16,
    ...StyleSheet.absoluteFillObject,
  },
  audioIconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    paddingRight: 16,
    ...StyleSheet.absoluteFillObject,
  },
});
export default styles;
