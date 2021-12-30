import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import theme from '../global/styles/theme';
import { MaterialIcons } from '@expo/vector-icons'
import Resume from '../screens/Resume';

interface ScreenStyle {
  size: number,
  color: string
}

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 60
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({size, color}: ScreenStyle) => (
            <MaterialIcons 
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({size, color}: ScreenStyle) => (
            <MaterialIcons 
              name="attach-money"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: (({size, color}: ScreenStyle) => (
            <MaterialIcons 
              name="pie-chart"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  )
}