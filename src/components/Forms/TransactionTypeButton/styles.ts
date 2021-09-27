import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import {Feather} from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';

interface TransactionProps { 
  type: "up" | "down"
  isSelected: boolean;
}

interface TypeProps { 
  type: "up" | "down"
}

export const Container = styled.View<TransactionProps>`
  width: 49%;
  align-items: center;
  justify-content: center;
   
  margin-top: -8px;
  border-radius: 5px;
  border: 1.5px solid ${({theme}) => theme.colors.text};

  ${({isSelected, type}) => isSelected && type === "up" && css`
    background-color: ${({theme}) => theme.colors.success_light};
    border: none;
  `};

  ${({isSelected, type}) => isSelected && type === "down" && css`
    background-color: ${({theme}) => theme.colors.attention_light};
    border: none;
  `};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px 16px;
  width: 100%;
`

export const Icon = styled(Feather)<TypeProps>`
  font-size:${RFValue(24)}px;
  margin-right: 12px;

  ${({type}) => type === "up" && css`color: ${({theme}) => theme.colors.success}`};

  ${({type}) => type === "down" && css`color: ${({theme}) => theme.colors.attention}`};
`;

export const Title = styled.Text<TransactionProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size:${RFValue(14)}px;

  color: ${({theme}) => theme.colors.title}
` 