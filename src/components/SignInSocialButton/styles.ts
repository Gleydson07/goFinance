import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled(RectButton)`
  margin: -28px 24px 44px;

  align-items: center;

  flex-direction: row;
  
  background-color: ${({theme}) => theme.colors.shapes};
  border-radius: 5px;
`

export const ImageContainer = styled.View`
  padding: 18px;
  border-right-width: 1px;
  border-right-color: ${({theme}) => theme.colors.background};
`

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.title}
`