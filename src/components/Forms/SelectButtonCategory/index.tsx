import React from 'react';

import { Container, Category, Icon } from './styles';

interface SelectCategoryProps {
  title: string;
  onPress: () => void;
}

export function SelectButtonCategory({title, onPress}: SelectCategoryProps){
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down"/>
    </Container>
  );
}