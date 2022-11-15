import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 16,
    paddingEnd: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  circle: {
    display: 'flex',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default styles;
