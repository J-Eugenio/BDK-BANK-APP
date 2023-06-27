import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { KeyboardTypeOptions } from "react-native/types";
import { DateInput } from "../DateInput";

import {
  Container,
  TextInput,
  ShowPassword,
  Main,
  OverTitle,
  ShowDateInput,
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
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(true);
  const [showDateInput, setShowDateInput] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Container>
      {overTitle && <OverTitle color={overTitleColor}>{overTitle}</OverTitle>}

      <Main>
        {icon && (
          <Icon name={iconName ? iconName : "bug"} size={20} color="#7F8192" />
        )}
        <TextInput
          value={isDateInput ? date.toLocaleDateString("pt-BR") : value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#7F8192"
          secureTextEntry={isPassword && showPassword}
          keyboardType={keyboardType}
          editable={!isDateInput}
          onBlur={onBlur}
          onChange={onChange}
        />
        {isPassword && (
          <ShowPassword
            activeOpacity={0.5}
            onPress={() => setShowPassword((oldValue) => !oldValue)}
          >
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={30}
              color="#7F8192"
            />
          </ShowPassword>
        )}
        {isDateInput && (
          <ShowDateInput
            activeOpacity={0.5}
            onPress={() => setShowDateInput(true)}
          >
            <Icon name="calendar" size={25} color="#7F8192" />
          </ShowDateInput>
        )}
        {isDateInput && showDateInput ? (
          <DateInput
            value={date}
            setValue={setDate}
            closeModal={setShowDateInput}
          />
        ) : (
          <></>
        )}
      </Main>
    </Container>
  );
}

export { Input };
