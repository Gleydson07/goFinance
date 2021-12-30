import React, { useState } from 'react';
import { Platform, Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  Subtitle,
  Footer
} from './styles'

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle(){
    try {
      setIsLoading(true);
      return await signInWithGoogle()
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Google')
    }
    setIsLoading(false)
  }

  async function handleSignInWithApple(){
    try {
      setIsLoading(true);
      return await signInWithApple()
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Apple')
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas
            finanças de forma
            muito simples
          </Title>

          <Subtitle>
            Faça seu login com
            uma das contas abaixo
          </Subtitle>

        </TitleWrapper>
      </Header>
      <Footer>
        <SignInSocialButton 
          title="Entrar com Google" 
          svg={GoogleSvg}
          onPress={handleSignInWithGoogle}
        />
        {Platform.OS === "ios" && 
          <SignInSocialButton 
            title="Entrar com Apple" 
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        }

        {isLoading && 
          <ActivityIndicator 
            color={theme.colors.shapes} 
            size={32}
            style={{marginTop: 16}}
          />}
      </Footer>
    </Container>
  )
}