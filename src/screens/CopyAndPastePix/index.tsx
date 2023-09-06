import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AmountInput } from "../../components/AmountInput";
import { Input } from "../../components/Input";
import {
  Container,
  Title,
  Main,
  Box,
  TransferInfoContainer,
  ImageContainer,
  Image,
  TransferInfoText,
  AmountContainer,
  AmountTitle,
  AmountValue,
  BoxUserInfo,
  Success,
  MainModal,
  ModalContainer,
  ModalSuccess,
  BoxButton,
  ButtonCheckPix,
  ButtonCheckPixText,
  Text,
  BoxButtonFinal,
} from "./styles";
import { Separator } from "../../components/Separator";
import UserIMG from "../../assets/user-img.png";
import { Button } from "../../components/Button";
import { ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ClienteSaldo,
  ReadQrCode,
  SendPix,
} from "../../service/ApiPaymentsRoutes";
import { formatMoney } from "../../utils/format-money";
import { showToast } from "../../utils/toast";
import { useAuth } from "../../hooks/auth";

function CopyAndPastePix() {
  const [pixCopyAndPasteKey, setPixCopyAndPasteKey] = useState("");
  const [pixCopyAndPasteValue, setPixCopyAndPasteValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingDataTransfer, setloadingDataTransfer] = useState(false);
  const [isDynamic, setIsDynamic] = useState(false);
  const [loadingReadCode, setLoadingReadCode] = useState(false);

  const [dataTransfer, setDataTransfer] = useState({} as any);
  const [payloadToModal, setPayloadToModal] = useState({} as any);
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  const { token } = useAuth();

  function mascaraMoeda(event: any) {
    const onlyDigits = event
      .split("")
      .filter((s: any) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    event = maskCurrency(digitsFloat);
  }

  function maskCurrency(valor: any, locale = "pt-BR", currency = "BRL") {
    const newValue = parseFloat(valor);
    setPixCopyAndPasteValue(String(newValue));
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    })
      .format(valor)
      .slice(2);
  }

  const clientBalance = async () => {
    await ClienteSaldo().then((res) => {
      if (res.data.Sucess === true) {
        setBalance(res.data.Object.valorDisponivel);
      } else {
        setBalance(0);
      }
    });
  };

  const readQrCodeCall = async (code: string) => {
    setloadingDataTransfer(true);
    setLoadingReadCode(true);
    await ReadQrCode(code, token)
      .then((res) => {
        if (res.data.Object.type === "statico") {
          setIsDynamic(false);
        }
        if (res.data.Object.type === "dinamico") {
          setIsDynamic(true);
        }
        if (!res.data.Object.valor) {
          setIsDynamic(true);
        }

        setDataTransfer(res.data.Object);
        clientBalance();
      })
      .catch(() => {
        showToast("Chave inválida!");
      })
      .finally(() => {
        setLoadingReadCode(false);
        setloadingDataTransfer(false);
      });
  };

  const handleSendPix = async () => {
    setLoading(true);

    if (balance > dataTransfer.valor) {
      const payload = {
        ToKeyPix: dataTransfer.chave,
        TypeKeyPix: 4,
        Name: dataTransfer.nomeRecebedor,
        Value:
          dataTransfer.valor !== null
            ? Number(dataTransfer.valor)
            : Number(pixCopyAndPasteValue),
        SaveContact: false,
        Message: "",
        Password: password,
        Bank: "",
      };
      await SendPix(payload)
        .then((res) => {
          if (res.data.Sucess) {
            const payloadSuccess = {
              Identificacao: res.data.Object.Identificacao,
              Data: new Date().toLocaleString(),
              Valor: payload.Value,
              Mensagem:
                "Seu pix está sendo processado, verifique o extrato para mais detalhes.",
            };
            setModalVisible(true);
            setPayloadToModal(payloadSuccess);
          } else {
            showToast(res.data.Message);
          }
        })
        .catch(() => {
          showToast("Erro ao enviar o Pix");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToast("Verifique seu saldo e tente novamente");
    }
  };

  return (
    <Container>
      <Main>
        <Title>Pix Copia e Cola</Title>

        {showPassword === false ? (
          <>
            <Box>
              <Input
                overTitle="Insira o pix copia e cola aqui"
                setValue={setPixCopyAndPasteKey}
                onChange={setPixCopyAndPasteKey}
              />
              {isDynamic === true ? (
                <>
                  <AmountInput
                    value={String(mascaraMoeda(pixCopyAndPasteValue))}
                    overTitle="Digite o valor"
                    setValue={setPixCopyAndPasteValue}
                    onChange={setPixCopyAndPasteValue}
                  />
                </>
              ) : (
                ""
              )}
              <ButtonCheckPix
                onPress={() => readQrCodeCall(pixCopyAndPasteKey)}
                disabled={loadingReadCode}
              >
                {loadingReadCode === true ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <>
                    <ButtonCheckPixText>CONTINUAR</ButtonCheckPixText>
                  </>
                )}
              </ButtonCheckPix>

              {loadingDataTransfer === true ? (
                <>
                  <ActivityIndicator size="large" />
                </>
              ) : (
                <>
                  {dataTransfer.chave ? (
                    <>
                      <Separator />

                      <TransferInfoContainer>
                        <ImageContainer>
                          <Image source={UserIMG} resizeMode="contain" />
                        </ImageContainer>

                        <BoxUserInfo>
                          <TransferInfoText>
                            {dataTransfer.nomeRecebedor}
                          </TransferInfoText>
                          <TransferInfoText>
                            {dataTransfer.cpfCnpjRecebedor}
                          </TransferInfoText>
                          <AmountContainer>
                            <AmountTitle>Valor:</AmountTitle>
                            <AmountValue>
                              {formatMoney.format(dataTransfer.valor)}
                            </AmountValue>
                          </AmountContainer>
                        </BoxUserInfo>
                      </TransferInfoContainer>
                    </>
                  ) : (
                    ""
                  )}
                  {dataTransfer.chave ? (
                    <>
                      <Button
                        title="Limpar"
                        color="#6EA965"
                        onPress={() => {
                          setPixCopyAndPasteValue("");
                          setPixCopyAndPasteKey("");
                        }}
                      />
                      <BoxButtonFinal>
                        <Button
                          title="Confirmar"
                          color="#6EA965"
                          onPress={() => setShowPassword(true)}
                        />
                      </BoxButtonFinal>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </Box>
          </>
        ) : (
          <>
            <Input
              overTitle="Digite sua senha transacional"
              isPassword={true}
              setValue={setPassword}
              onChange={setPassword}
            />
            <BoxButton>
              <Button
                title="Cancelar"
                color="#E74343"
                onPress={() => navigation.navigate("Pix")}
              />
              <Button
                title="Transferir"
                color="#6EA965"
                loading={loading}
                disabled={loading}
                onPress={() => handleSendPix()}
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
          <MainModal>
            <Icon name="check-square-o" size={120} color="#6EA965" />

            <Success>Pix realizado!</Success>
            <Box>
              <Text>Identificação: {payloadToModal.Identificacao}</Text>
              <Text>Data de transição: {payloadToModal.Data}</Text>
              <Text>Valor: {formatMoney.format(payloadToModal.Valor)}</Text>
              <Box>
                <Text>{payloadToModal.Mensagem}</Text>
              </Box>
            </Box>
            <BoxButton>
              <Button
                title="Voltar"
                color="#5266CE"
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Pix");
                }}
              />
            </BoxButton>
          </MainModal>
        </ModalContainer>
      </ModalSuccess>
    </Container>
  );
}

export { CopyAndPastePix };
