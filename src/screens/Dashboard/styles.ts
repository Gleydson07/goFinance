import styled from 'styled-components/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import {Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme';
import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { DataListProps } from '.';

export const Container = styled.View`
    flex: 1;    
    background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};
    
    flex-direction: row;
    align-items: flex-start;
    padding-top: ${RFValue(50)}px;
`

export const UserProfile = styled.View`
    width: 100%;
    padding: 0 24px; 

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const UserGreeting = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${theme.colors.shapes};
`

export const UserName = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    color: ${theme.colors.shapes};
`

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`

export const User = styled.View`
    margin-left: 17px;
`

export const LogoutButton = styled(BorderlessButton)`

`

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.secondary};
` 

export const CardList = styled.ScrollView.attrs({
    horizontal:true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{paddingHorizontal: 24},
})`
    margin-top: ${RFPercentage(20)}px;
    width: 100%;
    position: absolute;
`

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    margin-bottom: ${RFValue(16)}px;
`

export const TransactionsList = styled(
    FlatList as new () => FlatList<DataListProps>
).attrs({    
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {paddingBottom: 24}
})`
  
`

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center
`