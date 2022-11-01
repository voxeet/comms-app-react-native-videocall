import {
  CommsProvider,
  Text,
  ThemeProvider,
  TranslationProvider,
} from '@dolbyio/comms-uikit-react-native';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';

import {Navigator} from './screens/Navigator';

export const SHARE_SCHEME = 'dolbyio://';
export const SHARE_PATH = 'conference';

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  console.log(`App token: ${token}`);

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
        <CommsProvider
          token={token}
          refreshToken={async () => Promise.reject()}>
          <ThemeProvider>
            <Navigator token={token} setToken={setToken} />
          </ThemeProvider>
        </CommsProvider>
      </NavigationContainer>
    </TranslationProvider>
  );
};

export default App;
