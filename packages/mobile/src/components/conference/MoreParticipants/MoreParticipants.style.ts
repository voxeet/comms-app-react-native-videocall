import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  avatarsRowWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'visible',
    padding: 18,
  },
  avatarWrapper: {
    width: 32,
    alignItems: 'center',
    alignContent: 'flex-end',
  },
  participantsCountWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
