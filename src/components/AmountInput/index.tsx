import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  TextInput,
  ShowPassword,
  Main,
  OverTitle,
  LabelValueIcon,
  Flex
} from './styles';

interface InputProps {
  value?: string;
  setValue?: (value: any) => void;
  placeholder?: string;
  overTitle?: string
}
function AmountInput({ value, setValue, placeholder, overTitle }: InputProps){
  return(
    <Container>
      {
        overTitle && (
          <OverTitle>{overTitle}</OverTitle>
        )
      }
      <Flex>
        <LabelValueIcon>R$</LabelValueIcon>
        <Main>
          <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor="#7F8192"
          />
        </Main>
      </Flex>
    </Container>
  )
}

export { AmountInput }

