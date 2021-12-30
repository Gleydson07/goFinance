import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Header from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';
import theme from '../../global/styles/theme'

import { 
  Container,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  Month,
  MonthSelectIcon,
  LoadContainer
} from './styles';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

interface TransactionDataProps {
  type: "up" | "down";
  title: string;
  amount: string;
  category: string;
  dateTransaction: string;
}

interface CategoryDataProps {
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
  color: string;
}

// const tabBarHeight = useBottomTabBarHeight();

export function Resume(){
  const {user} = useAuth();
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<CategoryDataProps[]>([] as CategoryDataProps[])
  const [selectedHeaderDate, setSelectedHeaderDate] = useState(new Date());

  const dataKey = `@gofinance:transactions_user:${user.id}`;

  function handleChangeDate(action: "next" | "prev"){
    if(action === "next"){
      setSelectedHeaderDate(addMonths(selectedHeaderDate, 1))
    }else{
      setSelectedHeaderDate(subMonths(selectedHeaderDate, 1))
    }
  }

  async function loadData(){
    setIsLoadingGraph(true);

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    const totalByCategory: CategoryDataProps[] = [] as CategoryDataProps[];

    const expenses = responseFormatted.filter((expense: TransactionDataProps) => 
      expense.type === "down"
      && new Date(expense.dateTransaction).getMonth() === selectedHeaderDate.getMonth()
      && new Date(expense.dateTransaction).getFullYear() === selectedHeaderDate.getFullYear()
    );

    const expensesTotal = expenses.reduce((acc: number, expense:TransactionDataProps) => {
      return acc + Number(expense.amount)
    }, 0)

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionDataProps) => {
        if(expense.category === category.key){
          categorySum += Number(expense.amount);
        }
      })

      if(categorySum){
        const total = Intl.NumberFormat('pt-BR', {
          style: "currency", 
          currency: "BRL"
        }).format(categorySum);

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted: total,
          percent: `${(categorySum/expensesTotal*100).toFixed(2)}%`,
          color: category.color
        })
      }
    })

    setTotalByCategories(totalByCategory);
    setIsLoadingGraph(false);
  }

  
  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedHeaderDate]))

  return (
    <Container>
      <Header title="Resumo por categorias"/>
      {
        isLoadingGraph ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> 
        :
        <Content 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate("prev")}>
              <MonthSelectIcon name="chevron-left"/>
            </MonthSelectButton>

            <Month>{format(selectedHeaderDate, "MMMM, yyyy", {locale: ptBR})}</Month>
            
            <MonthSelectButton onPress={() => handleChangeDate("next")}>
              <MonthSelectIcon name="chevron-right"/>
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  fill: theme.colors.shapes
                }
              }}
              labelRadius={75}
              x="percent"
              y="total"
            />
          </ChartContainer>

          {totalByCategories.map(category => (
            <HistoryCard 
              key={category.name}
              title={category.name}
              amount={category.totalFormatted}
              color={category.color}
            />
          ))}
        </Content> 
      }
    </Container>
  )
}

export default Resume;