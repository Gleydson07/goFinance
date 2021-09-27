import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {TextInputProps} from 'react-native';
import { Input } from '../Input';

import { Container, Error } from './styles';

interface InputFormProps extends TextInputProps{
  name: string;
  control: Control;
  error: string;
}

export function InputForm({control, name, error, ...rest}: InputFormProps) {
  return (
    <Container {...rest} hasError={!!error}>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <Input 
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {error && <Error hasError={!!error}>{error}</Error>}
    </Container>
  );
}