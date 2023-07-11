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
import { showToast } from "../../utils/toast";
import {
  ClienteSaldo,
  ConsultKeyPix,
  ListContact,
} from "../../service/ApiPaymentsRoutes";
import { ActivityIndicator } from "react-native";

interface keyType {
  id: number;
  name: string;
}

interface ListContactDTO {
  Bank: string;
  Nome: string;
  Pix: string;
}

interface KeyPixProfileData {
  KeyPix: string;
  Name: string;
  NameBank: string;
  TypeKey: string;
}

function TransferPix() {
  const [changeToTransfer, setChangeToTransfer] = useState(1);
  const [keyType, setKeyType] = useState({} as keyType);
  const [keyValue, setKeyValue] = useState("");
  const [pixAmountValue, setPixAmountValue] = useState("");
  const navigation = useNavigation<any>();
  const [showPixData, setShowPixData] = useState(false);
  const [valueMoney, setValueMoney] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingKeyPix, setLoadingKeyPix] = useState(false);
  const [listContactsData, setListContactsData] = useState<
    Array<ListContactDTO>
  >([]);
  const [pixDataToSend, setPixDataToSend] = useState({});

  const [keyPixProfileData, setKeyPixProfileData] = useState(
    {} as KeyPixProfileData | any
  );
  const [balance, setBalance] = useState(0);
  const clientBalance = async () => {
    await ClienteSaldo().then((res) => {
      if (res.data.Sucess === true) {
        setBalance(res.data.Object.valorDisponivel);
      } else {
        setBalance(0);
      }
    });
  };

  const formatPhone = (phone: string) => {
    const phoneFormatted = phone.split("+55");
    if (phoneFormatted[0].length === 0) {
      return phoneFormatted[1];
    } else {
      return phoneFormatted[0];
    }
  };

  const validateTypePix = (type: string, key: string) => {
    switch (type) {
      case " CPF":
        setKeyValue(key);
        setKeyType({ id: 0, name: "CPF" });

        break;
      case " CNPJ":
        setKeyValue(key);
        setKeyType({ id: 2, name: "CNPJ" });
        break;
      case " EMAIL":
        setKeyValue(key);
        setKeyType({ id: 2, name: "Email" });
        break;
      case " CELULAR":
        setKeyValue(key);
        setKeyType({ id: 3, name: "Telefone" });
        break;
      default:
        setKeyValue(key);
        setKeyType({ id: 4, name: "Chave Aleatória" });
        break;

      
    }
  };

  const handleConsultKeyPix = async (
    pixValue: string,
    isCalled?: boolean,
    isPhone?: boolean
  ) => {
    setLoadingKeyPix(true);
    setKeyPixProfileData({});
    const payload = {
      KeyPix: isPhone === true ? formatPhone(pixValue) : pixValue,
      TypeKey: Number(keyType.id),
    };
    await ConsultKeyPix(payload)
      .then((res: any) => {
        if (res.data.Sucess) {
          setKeyPixProfileData(res.data.Object);
          setShowPixData(true);
          if (isCalled) {
            validateTypePix(res.data.Object.TypeKey, res.data.Object.KeyPix);
          }
        } else {
          showToast(res.data.Message);
          setShowPixData(false);
        }
      })
      .catch(() => {
        setShowPixData(false);
        showToast("Pix Inválido!");
      })
      .finally(() => {
        setLoadingKeyPix(false);
      });
  };

  const listContacts = async () => {
    setLoading(true);
    await ListContact()
      .then((res) => {
        setListContactsData(res.data.Object);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateTypePixNumber = (type: string) => {
    let keyNumberType = 0;
    switch (type) {
      case " CPF":
        keyNumberType = 0;
        break;
      case " CNPJ":
        keyNumberType = 1;
        break;
      case " EMAIL":
        keyNumberType = 2;
        break;
      case " CELULAR":
        keyNumberType = 3;
        break;
      default:
        keyNumberType = 4;
        break;
    }

    return keyNumberType;
  };

  const handleSetPixDataPerSelect = (item: ListContactDTO) => {
    handleConsultKeyPix(item.Pix, true);
  };

  const handleSendPix = async () => {
    if (balance > Number(valueMoney)) {
      const payload = {
        ToKeyPix: keyPixProfileData.KeyPix,
        TypeKeyPix: validateTypePixNumber(keyPixProfileData.TypeKey),
        Name: keyPixProfileData.Name,
        Value: Number(valueMoney),
        SaveContact: addContact,
        Message: messagePix,
        Password: "",
        Bank: keyPixProfileData.NameBank,
      };
      setPixDataToSend(payload);
    } else {
      showToast("Verifique seu saldo e tente novamente");
    }
  };

  React.useEffect(() => {
    listContacts();
    clientBalance();
  }, []);

  const handleSelectKeyType = (keyId: number) => {
    switch (keyId) {
      case 0:
        setKeyType({ id: 0, name: "CPF" });
        setChangeToTransfer(3);
        break;
      case 1:
        setKeyType({ id: 2, name: "CNPJ" });
        setChangeToTransfer(3);
        break;
      case 2:
        setKeyType({ id: 2, name: "Email" });
        setChangeToTransfer(3);
        break;
      case 3:
        setKeyType({ id: 3, name: "Telefone" });
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
          {showPixData === true ? (
            <>
              {loadingKeyPix === true ? (
                <ActivityIndicator size="large" />
              ) : (
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
                    <BtnNewTransactionPix
                      onPress={() => setChangeToTransfer(3)}
                    >
                      <LabelBtn>Não</LabelBtn>
                    </BtnNewTransactionPix>
                    <BtnNewTransactionPix
                      onPress={() => setChangeToTransfer(5)}
                    >
                      <LabelBtn>Sim</LabelBtn>
                    </BtnNewTransactionPix>
                  </Box>
                </>
              )}
            </>
          ) : (
            ""
          )}
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
