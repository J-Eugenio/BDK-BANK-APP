import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ContactsList } from "../../components/ContactsList";
import { Header } from "../../components/Header";
import { Separator } from "../../components/Separator";
import {
  Container,
  Title,
  Main,
  BtnNewTransactionPix,
  LabelBtn,
  Box,
  OverTitle,
  BoxSelect,
  TransferInfoContainer,
  ImageContainer,
  TransferInfoText,
  AmountContainer,
  AmountTitle,
  AmountValue,
  Image,
  BoxButton,
} from "./styles";
import { Input } from "../../components/Input";
import { AmountInput } from "../../components/AmountInput";
import { BoxUserInfo } from "../CopyAndPastePix/styles";
import UserIMG from "../../assets/user-img.png";
import { SuccessStatus } from "../../components/SuccessStatus";
import { Button } from "../../components/Button";

interface keyType {
  id: number;
  name: string;
}

function TransferPix() {
  const [changeToTransfer, setChangeToTransfer] = useState(1);
  const [keyType, setKeyType] = useState({} as keyType);
  const [keyValue, setKeyValue] = useState("");
  const [pixAmountValue, setPixAmountValue] = useState("");
  const navigation = useNavigation<any>();

  const handleSelectKeyType = (keyId: number) => {
    switch (keyId) {
      case 1:
        setKeyType({ id: 1, name: "Email" });
        setChangeToTransfer(3);
        break;
      case 2:
        setKeyType({ id: 2, name: "Telefone" });
        setChangeToTransfer(3);
        break;
      case 3:
        setKeyType({ id: 3, name: "CPF / CNPJ" });
        setChangeToTransfer(3);
        break;
      case 4:
        setKeyType({ id: 4, name: "Chave Aleatória" });
        setChangeToTransfer(3);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      {changeToTransfer === 1 ? (
        <>
          <Header />

          <Main>
            <Title>Realizar um novo Pix</Title>
            <Box>
              <BtnNewTransactionPix onPress={() => setChangeToTransfer(2)}>
                <LabelBtn>Nova transação</LabelBtn>
              </BtnNewTransactionPix>
            </Box>
            <Separator />
            <Title>Contatos</Title>
            <ContactsList
              contactid="1"
              contactTitle="Fuano de Tal"
              contactSubtitle="000000000-00"
            />
          </Main>
        </>
      ) : (
        ""
      )}
      {changeToTransfer === 2 ? (
        <>
          <Main>
            <Title>Como deseja transferir?</Title>

            <Box>
              <OverTitle>Tipo de chave pix</OverTitle>
              <BtnNewTransactionPix onPress={() => handleSelectKeyType(1)}>
                <LabelBtn>Email</LabelBtn>
              </BtnNewTransactionPix>
              <BtnNewTransactionPix onPress={() => handleSelectKeyType(2)}>
                <LabelBtn>Telefone</LabelBtn>
              </BtnNewTransactionPix>
              <BtnNewTransactionPix onPress={() => handleSelectKeyType(3)}>
                <LabelBtn>CPF / CNPJ</LabelBtn>
              </BtnNewTransactionPix>
              <BtnNewTransactionPix onPress={() => handleSelectKeyType(4)}>
                <LabelBtn>Chave Aleatória</LabelBtn>
              </BtnNewTransactionPix>
            </Box>
          </Main>
        </>
      ) : (
        ""
      )}

      {changeToTransfer === 3 ? (
        <>
          <Title>Qual a chave pix?</Title>
          <Box>
            <Input overTitle={keyType.name} setValue={setKeyValue} />
          </Box>
          <Box>
            <BtnNewTransactionPix onPress={() => setChangeToTransfer(4)}>
              <LabelBtn>Confirmar</LabelBtn>
            </BtnNewTransactionPix>
          </Box>
        </>
      ) : (
        ""
      )}

      {changeToTransfer === 4 ? (
        <>
          <Title>É este usuário?</Title>
          <Box>
            <TransferInfoContainer>
              <ImageContainer>
                <Image source={UserIMG} resizeMode="contain" />
              </ImageContainer>

              <BoxUserInfo>
                <TransferInfoText>
                  Nome da pessoa: Fulano Fulano Fulano
                </TransferInfoText>
                <TransferInfoText>CPF: 000-XXX</TransferInfoText>
                <AmountContainer>
                  <AmountTitle>Valor:</AmountTitle>
                  <AmountValue>R$ 5,00</AmountValue>
                </AmountContainer>
              </BoxUserInfo>
            </TransferInfoContainer>
          </Box>
          <Box>
            <BtnNewTransactionPix onPress={() => setChangeToTransfer(3)}>
              <LabelBtn>Não</LabelBtn>
            </BtnNewTransactionPix>
            <BtnNewTransactionPix onPress={() => setChangeToTransfer(5)}>
              <LabelBtn>Sim</LabelBtn>
            </BtnNewTransactionPix>
          </Box>
        </>
      ) : (
        ""
      )}

      {changeToTransfer === 5 ? (
        <>
          <Title>Informe o valor abaixo</Title>
          <Box>
            <AmountInput
              overTitle="Digite o valor"
              setValue={setPixAmountValue}
            />
          </Box>
          <Box>
            <BtnNewTransactionPix onPress={() => setChangeToTransfer(6)}>
              <LabelBtn>Transferir</LabelBtn>
            </BtnNewTransactionPix>
          </Box>
        </>
      ) : (
        ""
      )}

      {changeToTransfer === 6 ? (
        <>
          <Title>Digite sua senha</Title>
          <Box>
            <Input
              overTitle="Digite sua senha transacional"
              isPassword={true}
            />
          </Box>
          <Box>
            <BtnNewTransactionPix onPress={() => setChangeToTransfer(7)}>
              <LabelBtn>Confirmar</LabelBtn>
            </BtnNewTransactionPix>
          </Box>
        </>
      ) : (
        ""
      )}

      {changeToTransfer === 7 ? (
        <>
          <SuccessStatus />
          <Box>
            <BoxButton>
              <Button
                title="Ver Extrato"
                color="#F08E34"
                onPress={() => {
                  navigation.navigate("Extract");
                  setChangeToTransfer(1);
                }}
              />
              <Button
                title="Voltar"
                color="#5266CE"
                onPress={() => {
                  navigation.navigate("Pix");
                  setChangeToTransfer(1);
                }}
              />
            </BoxButton>
          </Box>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}

export { TransferPix };
