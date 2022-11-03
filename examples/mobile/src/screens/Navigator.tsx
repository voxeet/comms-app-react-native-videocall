import useTheme from '@dolbyio/comms-uikit-react-native/src/hooks/useTheme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {Routes} from '../types/routes.types';

import Conference from './Conference';
import ConferenceCreate from './ConferenceCreate';
import ConferenceJoin from './ConferenceJoin';
import ConferenceLeft from './ConferenceLeft';
import Home from './Home';
import InputToken from './InputToken';
import MeetingNameInput from './MeetingNameInput';
import Onboarding from './Onboarding';
import SelectTheme from './SelectTheme';
import Setup from './Setup';
import UserNameInput from './UserNameInput';

type TokenProviderProps = {
  token: string;
  setToken: (token: string) => void;
};
const Stack = createNativeStackNavigator();

export const Navigator = ({token, setToken}: TokenProviderProps) => {
  const {theme} = useTheme();
  const noToken = token === null;
  let content;
  const setter = (token: string) => {
    setToken(token);
  };
  if (noToken) {
    content = (
      <Stack.Navigator
        initialRouteName={Routes.InputToken}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.white, // FIXME: Use a different color defined in the themes
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name={Routes.InputToken}
          component={gestureHandlerRootHOC(InputToken)}
          initialParams={{
            setToken: setter,
          }}
          options={{
            headerShown: true,
            title: 'Scan QR code',
          }}
        />
      </Stack.Navigator>
    );
  } else {
    content = (
      <Stack.Navigator
        initialRouteName={Routes.Home}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.white, // FIXME: Use a different color defined in the themes
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name={Routes.Home}
          component={gestureHandlerRootHOC(Home)}
          initialParams={{
            setToken: setter,
          }}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Conference}
          component={gestureHandlerRootHOC(Conference)}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.ConferenceCreate}
          component={gestureHandlerRootHOC(ConferenceCreate)}
        />
        <Stack.Screen
          name={Routes.ConferenceJoin}
          component={gestureHandlerRootHOC(ConferenceJoin)}
        />
        <Stack.Screen
          name={Routes.ConferenceLeft}
          component={gestureHandlerRootHOC(ConferenceLeft)}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Onboarding}
          component={gestureHandlerRootHOC(Onboarding)}
        />
        <Stack.Screen
          name={Routes.SelectTheme}
          component={gestureHandlerRootHOC(SelectTheme)}
        />
        <Stack.Screen
          name={Routes.Setup}
          component={gestureHandlerRootHOC(Setup)}
        />
        <Stack.Screen
          name={Routes.UserNameInput}
          component={gestureHandlerRootHOC(UserNameInput)}
          options={({route}) => ({
            headerShown: true,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name={Routes.MeetingNameInput}
          component={gestureHandlerRootHOC(MeetingNameInput)}
          options={({route}) => ({
            headerShown: true,
            title: route.params.title,
          })}
        />
      </Stack.Navigator>
    );
  }

  return content;
};
