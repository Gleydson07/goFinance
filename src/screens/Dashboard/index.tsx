import React, { useState, useEffect, useCallback } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { CardTransactionProps, TransactionCard } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native'

import {
  Container,
  Header,
  UserProfile,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  CardList,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from './styles'

interface HighlightCardProps {
  type: "up" | "down" | "total"
  title: string;
  amount: string;
  lastTransaction: string;
}

export interface DataListProps extends CardTransactionProps {
  id: string;
}

const userProfile = {
  image: "https://avatars.githubusercontent.com/u/17955465?v=4",
  name: "Gleydson"
}

const cardListData: HighlightCardProps[] = [
  {
    type:"up",
    title:"Entradas",
    amount:"R$ 17.400,00",
    lastTransaction:"última entrada dia 13 de abril",
  },
  {
    type:"down",
    title:"Saídas",
    amount:"R$ 1.259,00",
    lastTransaction:"última saída dia 03 de abril",
  },
  {
    type:"total",
    title:"Total",
    amount:"R$ 1.259,00",
    lastTransaction:"01 à 16 de abril",
  }
]

const dataKey = "gofinance@transactions";

export function Dashboard(){
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  
  async function clearTransactions(){
    await AsyncStorage.removeItem(dataKey);
  }

  async function loadTransactions(){
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormatted: DataListProps[] = 
    transactions.map((item: DataListProps) => {
        const amount = Intl.NumberFormat('pt-BR', {
          style: "currency", 
          currency: "BRL"
        }).format(Number(item.amount))
        const dateTransaction = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(new Date(item.dateTransaction));
          
        return {
          id: item.id,
          type: item.type,
          title: item.title,
          amount,
          category: item.category,
          dateTransaction,
        }
      })
    setTransactions(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      <Header>
        <UserProfile>

          <UserInfo>
            <Photo source={{uri:userProfile.image}}/>

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{userProfile.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton
            onPress={() => {}}
          >
            <Icon name="power"/>
          </LogoutButton>
        </UserProfile>
      </Header>

      <CardList>
        {cardListData.map((item:HighlightCardProps) => (
          <HighlightCard
            key={item.title}
            type={item.type}
            title={item.title}
            amount={item.amount}
            lastTransaction={item.lastTransaction}
          />
        ))}
      </CardList>
    
      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TransactionCard
              key={item.id}
              type={item.type}
              title={item.title}
              amount={item.amount}
              category={item.category}
              dateTransaction={item.dateTransaction}
            />
          )} 
        />
      </Transactions>

    </Container>
  )
}