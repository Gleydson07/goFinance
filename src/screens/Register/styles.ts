import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(115)}px;
  background-color: ${({theme}) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(18)}px;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.shapes};
`

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;

  width: 100%;
  padding: 24px;
`

export const Fields = styled.View`

`

export const TypeTransactionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 16px 0;
`