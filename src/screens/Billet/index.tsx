import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import {
  Container,
  Title,
  Main,
  PD,
  Image,
  TransferInfoContainer,
  TransferInfoText,
  ImageContainer,
  AmountTitle,
  AmountValue,
  AmountContainer,
  ModalSuccess,
  ModalContainer,
  MainModal,
  Success,
  AmountButton,
  AmountView,
} from "./styles";
import { Separator } from "../../components/Separator";
import { Col } from "../../components/Flex/Col";
import { Row } from "../../components/Flex/Row";
import { Button } from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

import UserIMG from "../../assets/user-img.png";
import { DateInput } from "../../components/DateInput";

function Billet() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [datePayment, setDatePayment] = useState(new Date());
  const navigation = useNavigation<any>();

  return (
    <Container>
      <Header />

      <Main>
       
        <Title>Boleto</Title>
        {showPassword === false ? (
          <>
            <Input overTitle="Digite o código do boleto" />

            <Separator />

            <TransferInfoContainer>
              <AmountView>
                <TransferInfoText>Nome da empresa</TransferInfoText>
                <TransferInfoText>CNPJ</TransferInfoText>
                <AmountContainer>
                  <AmountTitle>Valor:</AmountTitle>
                  <AmountValue>R$ 5,00</AmountValue>
                </AmountContainer>
                <AmountContainer>
                  <AmountTitle>Data de Vencimento:</AmountTitle>
                  <AmountTitle>00/00/0000</AmountTitle>
                </AmountContainer>
                <AmountContainer>
                  <AmountTitle>Data de Pagamento:</AmountTitle>
                  <AmountValue>{datePayment.toLocaleDateString()}</AmountValue>
                </AmountContainer>
                <AmountContainer>
                  <AmountButton onPress={() => setShowDateInput(true)}>Altere a data de pagamento</AmountButton>
                </AmountContainer>
                {
                  showDateInput ? <DateInput value={datePayment} setValue={setDatePayment} closeModal={setShowDateInput} /> : <></>
                }
              </AmountView>
            </TransferInfoContainer>

            <Row>
              <Button
                title="Cancelar"
                color="#E74343"
                onPress={() => navigation.navigate("Payments")}
              />
              <Button
                title="Confirmar"
                color="#6EA965"
                onPress={() => setShowPassword(true)}
              />
            </Row>
            <PD />
          </>
        ) : (
          <>
            <Input
              overTitle="Digite sua senha transacional"
              isPassword={true}
            />
            <Row>
              <Button
                title="Cancelar"
                color="#E74343"
                onPress={() => navigation.navigate("Payments")}
              />
              <Button
                title="Transferir"
                color="#6EA965"
                onPress={() => setModalVisible(true)}
              />
            </Row>
          </>
        )}
      </Main>

      <ModalSuccess
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          <Title>Transferência</Title>

          <MainModal>
            <Icon name="check-square-o" size={120} color="#6EA965" />

            <Success>Transação realizada!</Success>

            <Row>
              <Button
                title="Ver Extrato"
                color="#F08E34"
                onPress={() => navigation.navigate("Extract")}
              />
              <Button
                title="Voltar"
                color="#5266CE"
                onPress={() => {
                  setModalVisible(false), setShowPassword(false);
                }}
              />
            </Row>
          </MainModal>
        </ModalContainer>
      </ModalSuccess>
    </Container>
  );
}

export { Billet };
