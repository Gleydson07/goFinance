import styled, {css} from "styled-components/native";
import {RFValue} from 'react-native-responsive-fontsize';

import {Feather } from '@expo/vector-icons'

interface TypeProps {
  type: "up" | "down";
}

export const Container = styled.View`
  padding: ${RFValue(18)}px ${RFValue(24)}px;
  background-color: ${({theme}) => theme.colors.shapes};
  border-radius: 5px;

  margin-bottom: ${RFValue(16)}px;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.title};
`

export const Amount = styled.Text<TypeProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  margin-top: 2px;

  ${({type}) => type === "up" && css`
        color: ${({theme}) => theme.colors.success};
  `};

  ${({type}) => type === "down" && css`
        color: ${({theme}) => theme.colors.attention};
  `};
`

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(20)}px;
`

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

export const DateTransection = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
  color: ${({theme}) => theme.colors.text};
`

export const Description = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`
