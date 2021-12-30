import React, {useState} from 'react';
import {
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import {useForm} from 'react-hook-form'
import * as Yup  from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native'

import { SelectCategory } from '../SelectCategory';

import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/Forms/InputForm';
import { SelectButtonCategory } from '../../components/Forms/SelectButtonCategory';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { 
  Container, 
  Form,
  Fields,
  TypeTransactionsContainer
} from './styles';
import Header from '../../components/Header';

type type = "up" | "down";

interface FormDataProps {
  description: string;
  amount: string;
}

const initCategory = {
  key: "category",
  name: "Categoria",
}

const schema = Yup.object().shape({
  description: Yup
    .string()
    .required("Descrição é obrigatória"),
  amount: Yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Preço é obrigatório")
}).defined()

const dataKey = "@gofinance:transactions";

export function Register(){
  const [typeSelected, setTypeSelected] = useState<type>("up");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState(initCategory);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: "up" | "down"){
    setTypeSelected(type);
  }

  function handleCloseModal(){
    setCategoryModalOpen(false)
  }

  function handleOpenModal(){
    setCategoryModalOpen(true)
  }

  async function handleRegister(form: FormDataProps){
    if(!typeSelected) return Alert.alert("Selecione o tipo da transação");
    if(category.key === "category") return Alert.alert("Selecione uma categoria");

    const newTransactions = {
      id: String(uuid.v4()),
      type: typeSelected,
      title: form.description,
      amount: form.amount,
      category: category.key,
      dateTransaction: new Date()
    }

    try {      
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, {...newTransactions}]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset();
      setTypeSelected("up");
      setCategory(initCategory);

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
      <Header title="Cadastro"/>
        
        <Form>
          <Fields>
            <InputForm 
              name="description"
              control={control}
              placeholder="Descrição"
              autoCapitalize="sentences"
              autoCorrect={false} 
              error={errors.description && errors.description.message}
            />
            <InputForm 
              name="amount"
              control={control}
              placeholder="Preço" 
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TypeTransactionsContainer>
              <TransactionTypeButton 
                title="Entradas" 
                type="up" 
                isSelected={typeSelected === "up"}
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton 
                title="Saídas" 
                type="down" 
                isSelected={typeSelected === "down"}
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TypeTransactionsContainer>

            <SelectButtonCategory 
              title={category.name} 
              onPress={handleOpenModal}
            />
          </Fields>

          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <SelectCategory
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}