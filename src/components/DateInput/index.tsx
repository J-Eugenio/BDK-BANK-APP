import { useState } from "react";
import { Container, TextInput, Main, OverTitle, OverTitleConainer } from "./styles";
import DatePicker from "@react-native-community/datetimepicker";

interface InputProps {
  value: Date;
  setValue?: (value: any) => void;
  overTitle?: string;
  closeModal?: any;
}
function DateInput({ value, setValue, overTitle, closeModal }: InputProps) {
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate: string = selectedDate;
    setShow(false);
    // @ts-ignore
    setValue(currentDate);
    closeModal = false
  };

  const showMode = (currentMode: any) => {
    setShow(false);
    setMode(currentMode);
  };

  return (
    <Container>
      <Main>
        {show === true ? (
          <DatePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            dateFormat="day month year"
            locale="pt-BR"
            onChange={onChange}
          />
        ) : ""}
        <DatePicker value={value} onChange={setValue} />
      </Main>
    </Container>
  );
}

export { DateInput };
