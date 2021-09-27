import styled, {css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

import {Feather } from '@expo/vector-icons'

interface TypeProps { 
    type: "up" | "down" | "total"
}


export const Container = styled.View<TypeProps>` 
    width: ${RFValue(280)}px;    

    background-color: ${({theme, type}) => type === "total" ? theme.colors.secondary : theme.colors.shapes};
    
    margin-right: 16px;
    padding: 18px 24px ${RFValue(42)}px;
    border-radius: 5px;
`

export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;

    ${({type}) => type === "up" && css`
        color: ${({theme}) => theme.colors.success};
    `}
    ${({type}) => type === "down" && css`
        color: ${({theme}) => theme.colors.attention};
    `}
    ${({type}) => type === "total" && css`
        color: ${({theme}) => theme.colors.shapes};
    `};
` 

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const TypeTransaction = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({theme, type}) => type === "total" ? theme.colors.shapes : theme.colors.title};
`

export const Content = styled.View`

`;

export const Amount = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    margin-top: 38px;

    color: ${({theme, type}) => type === "total" ? theme.colors.shapes : theme.colors.title};
`;

export const TransactionData = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    color: ${({theme, type}) => type === "total" ? theme.colors.shapes : theme.colors.text};
`;
