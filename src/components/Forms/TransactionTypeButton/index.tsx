import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
  Container, 
  Title, 
  Icon, 
  Button 
} from './styles';

interface ButtonProps extends RectButtonProps{
  type: "up" | "down";
  title: string;
  isSelected: boolean;
}

export function TransactionTypeButton({title, type, isSelected, ...rest}: ButtonProps){
  const nameIcon = type === "up" ? "arrow-up-circle" : "arrow-down-circle";

  return (
    <Container isSelected={isSelected} type={type} >
      <Button {...rest}>
        <Icon name={nameIcon} type={type}/>
        <Title isSelected={isSelected} type={type}>{title}</Title>
      </Button>
    </Container>
  );
}