import React from 'react';
import 'react-native-gesture-handler'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import AppRoutes from './src/routes/app.routes';

import theme from './src/global/styles/theme'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
  
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar 
          barStyle="light-content" 
          translucent 
          backgroundColor="transparent" 
        />
        <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}

