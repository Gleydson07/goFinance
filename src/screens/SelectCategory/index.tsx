import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';

import { 
  Container,
  Header, 
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles';

import { categories } from '../../utils/categories';

interface CategoryProps {
  key: string;
  name: string;
}

interface SelectCategoryProps {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export function SelectCategory({
  category,
  setCategory,
  closeSelectCategory
}: SelectCategoryProps){

  function handleSelectCategory() {
    closeSelectCategory()
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{flex:1, width: '100%'}}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <Category 
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator/>}
      />

      <Footer>
        <Button title="Selecionar" onPress={handleSelectCategory}/>
      </Footer>
    </Container>
  );
}