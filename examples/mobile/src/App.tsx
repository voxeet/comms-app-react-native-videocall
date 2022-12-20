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
import {SHARE_LINK, SHARE_PATH} from './utils/share.util';
import {validateToken} from './utils/validation.util';

const App = () => {
  const linking = {
    prefixes: [SHARE_LINK],
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
