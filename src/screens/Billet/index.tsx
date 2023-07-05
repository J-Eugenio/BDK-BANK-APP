import React from "react";
import { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Title,
  Main,
  PD,
  TransferInfoContainer,
  TransferInfoText,
  AmountTitle,
  AmountValue,
  AmountContainer,
  ModalSuccess,
  ModalContainer,
  MainModal,
  Success,
  AmountButton,
  AmountView,
  ButtonCheckBillet,
  ButtonCheckBilletText,
  ButtonConfirmBillet,
} from "./styles";
import { Separator } from "../../components/Separator";
import { Row } from "../../components/Flex/Row";
import { Button } from "../../components/Button";
import { DateInput } from "../../components/DateInput";
import {
  ClienteSaldo,
  PayBoleto,
  ReadCodigoDeBarra,
} from "../../service/ApiPaymentsRoutes";
import { calcula_barra } from "../../utils/valToBarCode";
import { showToast } from "../../utils/toast";
import { findBank } from "../../utils/arrayBanks";
import { cnpjMask, cpfMask } from "../../utils/cfp-mask";
import { formatMoney } from "../../utils/format-money";

function Billet() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [billetCode, setBilletCode] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [showInfoBillet, setShowInfoBillet] = useState(false);
  const [loadingReadCodeBillet, setLoadingReadCodeBillet] = useState(false);

  const [billetInfo, setBilletInfo] = useState({} as any);
  const [balance, setBalance] = useState(0);
  const [isPassword, setIsPassword] = useState("");

  const requireErro = useMemo(
    () => billetCode === "" || showInfoBillet === false,
    [billetCode, showInfoBillet]
  );

  const clientBalance = async () => {
    await ClienteSaldo().then((res) => {
      if (res.data.Sucess === true) {
        setBalance(res.data.Object.valorDisponivel);
      } else {
        setBalance(0);
      }
    });
  };

  useEffect(() => {
    clientBalance();
  }, []);

  const readCodeBillet = async (billetCode: string) => {
    if (billetCode.length === 47) {
      setLoadingData(true);
      setLoadingReadCodeBillet(true);
      const codeBar = calcula_barra(billetCode);
      setBilletCode(codeBar);
      await ReadCodigoDeBarra(String(codeBar))
        .then((res) => {
          if (res.data.Sucess === false) {
            showToast(`${res.data.Message}`);
          } else {
            setShowInfoBillet(true);
            setBilletInfo(res.data.Object);
            setLoadingData(false);
          }
        })
        .catch((err) => {
          showToast("Falha ao encontrar boleto");
        })
        .finally(() => {
          setLoadingData(false);
          setLoadingReadCodeBillet(false);
        });
    } else {
      return;
    }
  };

  function handleClearFields() {
    setBilletCode("");
    setShowInfoBillet(false);
    setBilletInfo({});
    setIsPassword("");
    setLoading(false);
    setModalVisible(false);
  }

  async function handlePayBillet() {
    if (balance > billetInfo.valorPagamento) {
      try {
        if (requireErro || isPassword === "") return;
        setLoading(true);
        const res = await PayBoleto({
          Valor: billetInfo.valorPagamento,
          dateVencimento: billetInfo.dataVencimento,
          CodigoDeBarras: billetInfo.codigoBarras,
          Password: isPassword,
        });

        if (res.data.Sucess) {
          //Chama Toast de sucesso
          showToast(res.data.Message);

          handleClearFields();
        } else {
          showToast(res.data.Message);
        }
      } catch (error) {
        handleClearFields();
        showToast("Aconteceu algo de errado!");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("Saldo insuficiente! Verifique seu saldo e tente novamente");
    }
  }
  return (
    <Container>
      <Header />

      <Main>
        <Title>Boleto</Title>
        {showPassword === false ? (
          <>
            <Input
              overTitle="Digite o código do boleto"
              value={billetCode}
              placeholder="Código do boleto"
              setValue={setBilletCode}
              onChange={setBilletCode}
            />
            <ButtonCheckBillet
              onPress={() => readCodeBillet(billetCode)}
              disabled={loadingReadCodeBillet || billetCode.length < 47}
            >
              {loadingReadCodeBillet === true ? (
                <ActivityIndicator color={"#FFF"} size="large" />
              ) : (
                <>
                  <ButtonCheckBilletText>CONTINUAR</ButtonCheckBilletText>
                </>
              )}
            </ButtonCheckBillet>
            {loadingData === true ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                {showInfoBillet === true ? (
                  <>
                    <Separator />
                    <TransferInfoContainer>
                      <AmountView>
                        <TransferInfoText>
                          Banco Emitente:
                          {billetInfo.bancoEmitente
                            ? findBank(billetInfo.bancoEmitente.codigo)
                            : ""}
                        </TransferInfoText>
                        <TransferInfoText>
                          Beneficiário:
                          {billetInfo.beneficiario
                            ? billetInfo.beneficiario.nome
                            : ""}
                        </TransferInfoText>
                        <TransferInfoText>
                          {billetInfo.beneficiario.cpfCnpj
                            ? billetInfo.beneficiario.cpfCnpj.tipo
                            : ""}{" "}
                          do Beneficiário:{" "}
                          {billetInfo.beneficiario.cpfCnpj.numero
                            ? billetInfo.beneficiario.cpfCnpj.tipo === "CPF"
                              ? cpfMask(billetInfo.beneficiario.cpfCnpj.numero)
                              : cnpjMask(billetInfo.beneficiario.cpfCnpj.numero)
                            : "---"}
                        </TransferInfoText>
                        <TransferInfoText>
                          Dados De Multa:
                          {billetInfo
                            ? formatMoney.format(
                                billetInfo.dadosDeMultaJuros
                                  .split(" juros")[0]
                                  .split(" ")[1]
                              )
                            : ""}
                        </TransferInfoText>
                        <TransferInfoText>
                          Dados De Juros:
                          {billetInfo
                            ? formatMoney.format(
                                billetInfo.dadosDeMultaJuros
                                  .split(" valortotal")[0]
                                  .split("juros ")[1]
                              )
                            : ""}
                        </TransferInfoText>
                        <TransferInfoText>
                          Data de Vencimento:
                          {billetInfo
                            ? new Date(
                                billetInfo.dataVencimento
                              ).toLocaleDateString()
                            : ""}
                        </TransferInfoText>
                        <TransferInfoText>
                          Linha Digitável:
                          {billetInfo ? billetInfo.linhaDigitavel : ""}
                        </TransferInfoText>
                        <TransferInfoText>
                          Código de Barras:
                          {billetInfo ? billetInfo.codigoBarras : ""}
                        </TransferInfoText>
                        <AmountContainer>
                          <AmountTitle>Valor:</AmountTitle>
                          <AmountValue>
                            {billetInfo
                              ? formatMoney.format(billetInfo.valorPagamento)
                              : ""}
                          </AmountValue>
                        </AmountContainer>
                      </AmountView>
                    </TransferInfoContainer>

                    <Row>
                      <Button
                        title="Cancelar"
                        color="#E74343"
                        onPress={() => {
                          navigation.navigate("Payments");
                          handleClearFields();
                        }}
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
                  ""
                )}
              </>
            )}
          </>
        ) : (
          <>
            <Input
              overTitle="Digite sua senha transacional"
              isPassword={true}
              setValue={setIsPassword}
              onChange={setIsPassword}
            />
            <Row>
              <Button
                title="Cancelar"
                color="#E74343"
                onPress={() => {navigation.navigate("Payments"); handleClearFields()}}
              />
              <ButtonConfirmBillet
                disabled={loading || isPassword === ""}
                onPress={() => handlePayBillet()}
              >
                <ButtonCheckBilletText>CONFIRMAR</ButtonCheckBilletText>
              </ButtonConfirmBillet>
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
                title="Voltar"
                color="#5266CE"
                onPress={() => {
                  setModalVisible(false), setShowPassword(false); handleClearFields();
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
