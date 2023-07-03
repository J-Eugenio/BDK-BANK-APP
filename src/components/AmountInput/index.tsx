import { KeyboardTypeOptions } from "react-native/types";

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
        <LabelValueIcon>R$</LabelValueIcon>
        <Main>
          <TextInput
            value={value}
            onChangeText={(e: any) => {
              const money = String(e.currentTarget?.value.slice(1))
                .replace(/[^0-9][,]/g, "")
                .replace("$", "")
                .replace(",", "*")
                .replaceAll(".", "");
              const new_value = Number(money.replace("*", "."));
              // @ts-ignore
              setValue(Number(new_value.toFixed(2)));
            }}
            placeholder={placeholder}
            placeholderTextColor="#7F8192"
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChange={onChange}
          />
        </Main>
      </Flex>
    </Container>
  );
}

export { AmountInput };
