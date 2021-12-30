import React from 'react';
import 'react-native-gesture-handler'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import AppLoading from 'expo-app-loading'
import { Routes } from './src/routes/index';
import { StatusBar } from 'react-native';

import theme from './src/global/styles/theme'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import { AuthProvider, useAuth } from './src/hooks/useAuth';
  
export default function App() {
  const {userStorageLoading} = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded && userStorageLoading){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent" 
      />
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  );
}

