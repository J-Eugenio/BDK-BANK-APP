import React from 'react'
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
  BoxButton,
} from "./styles";
import { Separator } from "../../components/Separator";
import { Col } from "../../components/Flex/Col";
import { Row } from "../../components/Flex/Row";
import { Button } from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

import UserIMG from "../../assets/user-img.png";

function Transfer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<any>();

  return (
    <Container>
      <Header />

      <Main>
        <Title>Transferência</Title>

        {showPassword === false ? (
          <>
            <Input overTitle="Agência" />

            <Input overTitle="Conta" />

            <Input overTitle="Valor" />

            <Separator />

            <TransferInfoContainer>
              <ImageContainer>
                <Image source={UserIMG} resizeMode="contain" />
              </ImageContainer>

              <Col>
                <TransferInfoText>Agência: 0000-X</TransferInfoText>
                <TransferInfoText>Conta: 0000-X</TransferInfoText>
                <AmountContainer>
                  <AmountTitle>Valor:</AmountTitle>
                  <AmountValue>R$ 5,00</AmountValue>
                </AmountContainer>
              </Col>
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
            <BoxButton>
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
            </BoxButton>
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

export { Transfer };
