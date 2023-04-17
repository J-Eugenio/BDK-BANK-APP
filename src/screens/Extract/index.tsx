import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import {
  Container,
  Title,
  Main,
  Label,
  AmountValue,
  Box,
  BtnDateOpen,
  LabelBox,
  Flex,
  SecondaryText,
  BoxToItemPerList,
} from "./styles";
import { DateInput } from "../../components/DateInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { LastTransactionItem } from "../../components/LastTransactionItem";

function Extract() {
  const [showDateInit, setShowDateInit] = useState(false);
  const [showDateIEnd, setShowDateEnd] = useState(false);
  const [dateFilterInit, setDateFilterInit] = useState(new Date());
  const [dateFilterEnd, setDateFilterEnd] = useState(new Date());
  const navigation = useNavigation<any>();

  return (
    <Container>
      <Header />

      <Main>
        <Title>Extratos</Title>
        <Flex>
          <Box>
            <BtnDateOpen onPress={() => setShowDateInit(true)}>
              <LabelBox>
                <Label>Data Inicial</Label>
                <Icon name="calendar" size={20} color="#00214E" />
              </LabelBox>
            </BtnDateOpen>
            <AmountValue>
              {dateFilterInit.toLocaleDateString("pt-BR")}
            </AmountValue>
          </Box>
          <Box>
            <BtnDateOpen onPress={() => setShowDateEnd(true)}>
              <LabelBox>
                <Label>Data Final</Label>
                <Icon name="calendar" size={20} color="#00214E" />
              </LabelBox>
            </BtnDateOpen>
            <AmountValue>
              {dateFilterEnd.toLocaleDateString("pt-BR")}
            </AmountValue>
          </Box>
        </Flex>
        {showDateInit ? (
          <DateInput
            value={dateFilterInit}
            setValue={setDateFilterInit}
            closeModal={setShowDateInit}
          />
        ) : (
          <></>
        )}
        {showDateIEnd ? (
          <DateInput
            value={dateFilterEnd}
            setValue={setDateFilterEnd}
            closeModal={setShowDateEnd}
          />
        ) : (
          <></>
        )}

        <SecondaryText>Últimas transações</SecondaryText>
        
        <BoxToItemPerList onPress={() => navigation.navigate("ExtractPerId", {
          itemId: 1
        })}>
          <LastTransactionItem 
            client='Teste User'
            paymentDate={new Date().toLocaleString()}
            paymentType='received'
            paymentValue={200}
          />
        </BoxToItemPerList>
      </Main>
    </Container>
  );
}

export { Extract };
