import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface HistoryCardProps {
  color: string;
}

export const Container = styled.View<HistoryCardProps>`
  width: 100%;
  height: ${RFValue(45)}px;
  background-color: ${({theme}) => theme.colors.shapes};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 12px 24px;
  margin-bottom: 8px;

  border-radius: 5px;
  border-left-width: 4px;
  border-left-color: ${({color}) => color};
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`

export const Amount = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`

