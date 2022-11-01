import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  selectTheme: {
    width: '100%',
    flex: 0.5,
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  btn: {
    marginVertical: 10,
    backgroundColor: 'lightgray',
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  darkGraphite: {
    backgroundColor: '#39393F',
  },
  cobaltBlue: {
    backgroundColor: '#0047AB',
  },

  deepPurple: {
    backgroundColor: '#570861',
  },
});

export default styles;
