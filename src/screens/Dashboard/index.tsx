import React, { useState, useEffect, useCallback } from 'react';
import {ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useFocusEffect} from '@react-navigation/native'

import { HighlightCard } from '../../components/HighlightCard';
import { CardTransactionProps, TransactionCard } from '../../components/TransactionCard';

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
  LogoutButton,
  LoadContainer
} from './styles'
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';

interface HighlightProps {
  total: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
};
export interface DataListProps extends CardTransactionProps {
  id: string;
}

const initHighlightData = {
  entries: {
    total: "0",
    lastTransaction: ""
  },
  expenses: {
    total: "0",
    lastTransaction: ""
  },
  total: {
    total: "0",
    lastTransaction: ""
  },
}

const dataKey = "@gofinance:transactions";

export function Dashboard(){
  const {user, signOut} = useAuth()
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [HighlightData, setHighlightData] = useState<HighlightData>(initHighlightData);
  const [isLoading, setIsLoading] = useState(true);
  
  async function clearTransactions(){
    await AsyncStorage.removeItem(dataKey);
  }

  async function loadTransactions(){
    let entriesTotal = 0;
    let expensesTotal = 0;
    let firstDataTransaction = new Date();
    let endDataTransaction = new Date('2000-01-01');
    let lastDataEntries = new Date('2000-01-01');
    let lastDataExpense = new Date('2000-01-01');

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    
    const transactionsFormatted: DataListProps[] = 
    transactions.map((item: DataListProps) => {
        if(item.type === "up"){
          entriesTotal += Number(item.amount);
          if(new Date(item.dateTransaction) > lastDataEntries) lastDataEntries = new Date(item.dateTransaction);
        };
        
        if(item.type === "down"){
          expensesTotal += Number(item.amount);
          if(new Date(item.dateTransaction) > lastDataExpense) lastDataExpense = new Date(item.dateTransaction);
        };
        
        if(new Date(item.dateTransaction) > endDataTransaction) endDataTransaction = new Date(item.dateTransaction);
        if(new Date(item.dateTransaction) < firstDataTransaction) firstDataTransaction = new Date(item.dateTransaction);

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
    
    setHighlightData({
      entries:{
        total: Intl.NumberFormat('pt-BR', {
          style: "currency", 
          currency: "BRL"
        }).format(Number(entriesTotal)),
        lastTransaction: "Última entrada dia "+Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long',
        }).format(lastDataEntries)
      },

      expenses:{
        total: Intl.NumberFormat('pt-BR', {
          style: "currency", 
          currency: "BRL"
        }).format(Number(expensesTotal)),
        lastTransaction: "Última saída dia "+Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long',
        }).format(lastDataExpense)
      },

      total:{
        total: Intl.NumberFormat('pt-BR', {
          style: "currency", 
          currency: "BRL"
        }).format(Number(entriesTotal)-Number(expensesTotal)),
        lastTransaction: Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long'
        }).format(firstDataTransaction)+" e "+Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long'
        }).format(endDataTransaction)
      },
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>      
      {isLoading ? 
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large"/>
        </LoadContainer>
        :
        <>
          <Header>
            <UserProfile>

              <UserInfo>
                <Photo source={{uri:user.avatar}}/>

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton
                onPress={signOut}
              >
                <Icon name="power"/>
              </LogoutButton>
            </UserProfile>
          </Header>

          <CardList>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={HighlightData.entries.total}
              lastTransaction={HighlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={HighlightData.expenses.total}
              lastTransaction={HighlightData.expenses.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={HighlightData.total.total}
              lastTransaction={HighlightData.total.lastTransaction}
            />
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
        </>
      }
    </Container>
  )
}