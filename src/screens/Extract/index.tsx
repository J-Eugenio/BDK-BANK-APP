import { useState } from "react";
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
  ModalSuccess,
  ModalContainer,
  MainModal,
  Success,
  DownloadButton,
  TitleBox,
  ModalBox,
} from "./styles";
import { DateInput } from "../../components/DateInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { LastTransactionItem } from "../../components/LastTransactionItem";

import { Button } from "../../components/Button";
import { createAndSavePDF } from "../../utils/downloadBilletPds";

function Extract() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDateInit, setShowDateInit] = useState(false);
  const [showDateIEnd, setShowDateEnd] = useState(false);
  const [dateFilterInit, setDateFilterInit] = useState(new Date());
  const [dateFilterEnd, setDateFilterEnd] = useState(new Date());
  const [extractItem, setExtractitem] = useState<any>({});

  const callDownloadBillet = async () => {
    await createAndSavePDF()
  }

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

        <BoxToItemPerList
          onPress={() => {
            setModalVisible(true);
            setExtractitem({
              id: 1,
              name: "Fulano",
              cpf: "000000000",
              value: "200.00",
              date_transaction: new Date().toLocaleDateString("pt-BR"),
            });
          }}
        >
          <LastTransactionItem
            client="Teste User"
            paymentDate={new Date().toLocaleString()}
            paymentType="received"
            paymentValue={200}
          />
        </BoxToItemPerList>
      </Main>
      <ModalSuccess
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          <TitleBox>
            <Title>Comprovante</Title>
            <DownloadButton onPress={() => callDownloadBillet()}>
              <Icon name="download" size={30} color="#00214E" />
            </DownloadButton>
          </TitleBox>
          <ModalBox>
            <Box>
              <LabelBox>
                <Label>Nome do Cliente</Label>
                <Label>{extractItem.name}</Label>
              </LabelBox>
            </Box>
            <Box>
              <LabelBox>
                <Label>CNPJ / CPF</Label>
                <Label>{extractItem.cpf}</Label>
              </LabelBox>
            </Box>
            <Box>
              <LabelBox>
                <Label>Data de transação</Label>
                <Label>{extractItem.date_transaction}</Label>
              </LabelBox>
            </Box>
            <Box>
              <LabelBox>
                <Label>Valor</Label>
                <Label>R$ {extractItem.value}</Label>
              </LabelBox>
            </Box>
            <Button
              title="Fechar"
              color="#5266CE"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </ModalBox>
        </ModalContainer>
      </ModalSuccess>
    </Container>
  );
}

export { Extract };
