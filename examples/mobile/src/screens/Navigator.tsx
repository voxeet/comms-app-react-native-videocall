import useTheme from '@dolbyio/comms-uikit-react-native/src/hooks/useTheme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {Routes} from '../types/routes.types';

import Conference from './Conference';
import ConferenceLeft from './ConferenceLeft';
import DemoToken from './DemoToken';
import Home from './Home';
import MeetingNameInput from './MeetingNameInput';
import SelectTheme from './SelectTheme';
import Setup from './Setup';
import UserNameInput from './UserNameInput';
import Welcome from './Welcome';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const {theme} = useTheme();

  const content = (
    <Stack.Navigator
      initialRouteName={Routes.Welcome}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.white, // FIXME: Use a different color defined in the themes
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={Routes.Welcome}
        component={gestureHandlerRootHOC(Welcome)}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.DemoToken}
        component={gestureHandlerRootHOC(DemoToken)}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Routes.Home}
        component={gestureHandlerRootHOC(Home)}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Conference}
        component={gestureHandlerRootHOC(Conference)}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.ConferenceLeft}
        component={gestureHandlerRootHOC(ConferenceLeft)}
        options={{headerShown: false}}
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

  return content;
};
