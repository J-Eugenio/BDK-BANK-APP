import { useState } from "react";
import { Container, TextInput, Main, OverTitle, OverTitleConainer } from "./styles";
import DatePicker from "@react-native-community/datetimepicker";

interface InputProps {
  value: Date;
  setValue?: (value: any) => void;
  overTitle?: string;
  closeModal?: (value: any) => void;
}
function DateInput({ value, setValue, overTitle, closeModal }: InputProps) {
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);

  const onChangeValue = (event: any, selectedDate: any) => {
    const currentDate: string = selectedDate;
    setShow(false);
    // @ts-ignore
    setValue(currentDate);
    // @ts-ignore
    closeModal(false)
  };

  const showMode = (currentMode: any) => {
    setShow(false);
    setMode(currentMode);
  };

  return (
    <Container>
      <Main>
        
        <DatePicker value={value} onChange={onChangeValue} />
      </Main>
    </Container>
  );
}

export { DateInput };
