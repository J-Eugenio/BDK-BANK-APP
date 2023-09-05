import React, { useState } from "react";
import { KeyboardTypeOptions } from "react-native/types";
import { TextInputMask } from 'react-native-masked-text';

import {
  Container,
  TextInput,
  ShowPassword,
  Main,
  OverTitle,
  LabelValueIcon,
  Flex,
} from "./styles";

interface InputProps {
  value?: string;
  setValue?: (value: any) => void;
  placeholder?: string;
  isPassword?: boolean;
  overTitle?: string;
  overTitleColor?: string;
  icon?: boolean;
  iconName?: string;
  keyboardType?: KeyboardTypeOptions;
  isDateInput?: boolean;
  onBlur?: any;
  onChange?: any;
}
function AmountInput({
  value,
  setValue,
  placeholder,
  overTitle,
  keyboardType,
  overTitleColor,
  onBlur,
  onChange,
}: InputProps) {

  return (
    <Container>
      {overTitle && <OverTitle>{overTitle}</OverTitle>}
      <Flex>
        <Main>
          <TextInputMask
            style={{ 
               width: '80%',
            }}
            type={'money'}
            placeholder="Renda mensal"
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            value={value}
            onChangeText={setValue}
            placeholderTextColor="#7F8192"
          />
        </Main>
      </Flex>
    </Container>
  );
}

export { AmountInput };
