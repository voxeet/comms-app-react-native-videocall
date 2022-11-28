import {
  CommsProvider,
  Text,
  ThemeProvider,
  TranslationProvider,
} from '@dolbyio/comms-uikit-react-native';
import TokenProvider from '@dolbyio/comms-uikit-react-native/src/providers/TokenProvider';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {Navigator} from './screens/Navigator';
import fetch from './utils/fetch.util';
import {validateToken} from './utils/validation.util';

export const SHARE_SCHEME = 'dolbyio://';
export const SHARE_PATH = 'conference';

const App = () => {
  const linking = {
    prefixes: [SHARE_SCHEME],
    config: {
      screens: {
        UserNameInput: SHARE_PATH,
      },
    },
  };

  return (
    <TranslationProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <TokenProvider validateToken={validateToken} fetch={fetch}>
          <CommsProvider>
            <ThemeProvider>
              <Navigator />
            </ThemeProvider>
          </CommsProvider>
        </TokenProvider>
      </NavigationContainer>
    </TranslationProvider>
  );
};

export default App;
