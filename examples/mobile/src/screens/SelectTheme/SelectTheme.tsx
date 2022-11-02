import {Layout, useTheme, Text} from '@dolbyio/comms-uikit-react-native';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from './SelectTheme.style';

export const SelectTheme = () => {
  const {setThemeMode, themeMode} = useTheme();

  return (
    <Layout testID="SelectThemeScreen">
      <View style={styles.selectTheme}>
        <Text type="H3" color="black" align="center">
          Select Theme Screen
        </Text>

        {/* // TODO - replace for dedicated buttons in the future */}

        <TouchableOpacity
          testID="DarkGraphite"
          onPress={() => setThemeMode('darkGraphite')}
          style={[styles.btn, styles.darkGraphite]}>
          <Text type="buttonDefault">
            {`Dark Graphite${themeMode === 'darkGraphite' ? ' - current' : ''}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="CobaltBlue"
          onPress={() => setThemeMode('cobaltBlue')}
          style={[styles.btn, styles.cobaltBlue]}>
          <Text type="buttonDefault">
            {`Cobalt Blue${themeMode === 'cobaltBlue' ? ' - current' : ''}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="DeepPurple"
          onPress={() => setThemeMode('deepPurple')}
          style={[styles.btn, styles.deepPurple]}>
          <Text type="buttonDefault">
            {`Deep Purple${themeMode === 'deepPurple' ? ' - current' : ''}`}
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
