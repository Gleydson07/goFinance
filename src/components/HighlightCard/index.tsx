import React from 'react';
import { View } from 'react-native';

import { 
  Container ,
  Header,
  TypeTransaction,
  Icon,
  Content,
  Amount,
  TransactionData
} from './styles';

interface CardTransactionProps {
  type: "up" | "down" | "total"
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up : "arrow-up-circle",
  down : "arrow-down-circle",
  total: "dollar-sign"
}


export function HighlightCard({title, amount, lastTransaction, type}: CardTransactionProps){
  return(
    <Container type={type}>
      <Header>
        <TypeTransaction type={type}>{title}</TypeTransaction>
        <Icon name={icon[type]} type={type}/>
      </Header>

      <Content>
        <Amount type={type}>{amount}</Amount>
        <TransactionData type={type}>{lastTransaction}</TransactionData>
      </Content>
      
    </Container>
  );
}