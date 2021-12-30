import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  height: 70%;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.primary};
`

export const TitleWrapper = styled.View`
  align-items: center;
  margin-top: ${RFValue(100)}px;
  padding: 0 24px;
`

export const Title = styled.Text`
  margin-top: ${RFValue(40)}px;
  margin-bottom: ${RFValue(80)}px;

  font-size: ${RFValue(30)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  text-align: center;

  color: ${({theme}) => theme.colors.shapes};
`

export const Subtitle = styled.Text`
  margin-bottom: ${RFValue(65)}px;

  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  text-align: center;

  color: ${({theme}) => theme.colors.shapes};
`

export const Footer = styled.View`
  height: 30%;
  background-color: ${({theme}) => theme.colors.secondary};
`

