import React, { useState }from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardTypeOptions } from 'react-native/types';
import { DateInput } from '../DateInput';

import {
  Container,
  TextInput,
  ShowPassword,
  Main,
  OverTitle,
  ShowDateInput
} from './styles';

interface InputProps {
  value?: string;
  setValue?: (value: any | undefined) => void;
  placeholder?: string;
  isPassword?: boolean;
  overTitle?: string;
  overTitleColor?: string;
  icon?: boolean;
  iconName?: string;
  keyboardType?: KeyboardTypeOptions;
  isDateInput?: boolean;
  onBlur?: any;
  onFocus?: any;
  onChange?: any;
  length?: number;
  isError?: boolean;
  isArea?: boolean;
  iscPF?: boolean;
}

function Input({ 
  value, 
  setValue, 
  placeholder, 
  isPassword, 
  overTitle, 
  icon, 
  iconName,
  keyboardType,
  isDateInput,
  overTitleColor,
  onBlur,
  onFocus,
  onChange,
  length,
  isError,
  isArea,
  iscPF
}: InputProps){
  const [showPassword, setShowPassword] = useState(true);
  const [showDateInput, setShowDateInput] = useState(false);
  const [date, setDate] = useState(new Date());

  function isValidDate(dateString: string) {
    let date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  return(
    <Container>
      {
        overTitle && (
          <OverTitle color={overTitleColor}>{overTitle}</OverTitle>
        )
      }
      
      <Main
        isError={isError}
        isArea={isArea}
      >
        {
          icon && 
          (
            <Icon 
              name={iconName ? iconName : "bug"}
              size={20}
              color="#7F8192"
            />
          )
        }
        <TextInput 
          value={isDateInput && isValidDate(value!) ? new Date(value!).toLocaleDateString('pt-BR') : value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#7F8192"
          secureTextEntry={isPassword && showPassword}
          keyboardType={keyboardType}
          editable={!isDateInput}
          onBlur={onBlur}
          onChange={onChange}
          maxLength={length}
          onFocus={onFocus}
          multiline={isArea}
          isArea={isArea}
        />
        {
          isPassword && (
            <ShowPassword
              activeOpacity={0.5}
              onPress={() => setShowPassword(oldValue => !oldValue)}
            >
              <Icon 
                name={showPassword ? "eye-slash" : "eye"}
                size={22}
                color="#7F8192"
              />
            </ShowPassword>
          )
        }
        {
          isDateInput && (
            <ShowDateInput
              activeOpacity={0.5}
              onPress={() => setShowDateInput(true)}
            >
              <Icon 
                name="calendar"
                size={25}
                color="#7F8192"
              />
            </ShowDateInput>
          )
        }
        {
          isDateInput && showDateInput ? <DateInput value={date} setValue={value => {
            setDate(value)
            setValue!(value)
          }} closeModal={setShowDateInput} /> : <></>
        }
        {
          isError && (
            <Icon 
              name="exclamation-circle"
              size={20}
              color="#C53030"
            />
          )
        }
      </Main>
    </Container>
  )
}


export { Input }
