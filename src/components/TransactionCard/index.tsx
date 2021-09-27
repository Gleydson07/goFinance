import React from 'react';
import { categories } from '../../utils/categories';

import { 
  Amount, 
  Category, 
  Container, 
  DateTransection, 
  Description, 
  Footer, 
  Icon, 
  Title 
} from './styles';

export interface CardTransactionProps {
  type: "up" | "down";
  title: string;
  amount: string;
  category: string;
  dateTransaction: string;
}

export function TransactionCard({type, title, amount, category, dateTransaction}: CardTransactionProps){
  const categoryData = categories.filter(item => item.key === category)[0];

  return (
    <Container>
      <Title >{title}</Title>
      <Amount type={type}>{type === "up" ? amount : "- "+amount}</Amount>
      <Footer>
        <Category>
          <Icon name={categoryData.icon}/>
          <Description>{categoryData.name}</Description>
        </Category>
        <DateTransection>{dateTransaction}</DateTransection>
      </Footer>
    </Container>
  );
}
