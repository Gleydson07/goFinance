import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface InputFormProps {
  hasError: boolean;
}

export const Container = styled.View<InputFormProps>`
  width: 100%;
  ${({hasError}) => !hasError && css`margin-bottom: 8px`};
`;

export const Error = styled.Text<InputFormProps>`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.attention};
  ${({hasError}) => hasError && css`margin-bottom: 8px`};
`

