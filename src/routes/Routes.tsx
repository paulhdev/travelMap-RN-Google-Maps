import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainScreen, PlaceProps } from '../screens/MainScreen/MainScreen';
import { MapScreen } from '../screens/MapScreen/MapScreen';

export type AppStackParamList = {
  MainScreen: undefined;
  MapScreen: {
    origin: PlaceProps;
    destination: PlaceProps;
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}
