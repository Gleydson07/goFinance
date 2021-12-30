import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Content = styled.ScrollView`

`

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 24px;
  padding: 0 24px;
`

export const MonthSelectButton = styled(BorderlessButton)`

`

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`