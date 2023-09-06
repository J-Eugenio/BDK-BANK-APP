import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { View, TextInput } from "react-native";
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
  Text,
  InputView,
  Label,
} from "./styles";
import { Separator } from "../../components/Separator";
import { Col } from "../../components/Flex/Col";
import { Row } from "../../components/Flex/Row";
import { Button } from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

import UserIMG from "../../assets/user-img.png";
import { ClienteSaldo, SendTed } from "../../service/ApiPaymentsRoutes";
import validCPFForReal, { cpfMask } from "../../utils/cfp-mask";
import { showToast } from "../../utils/toast";
import { bankCode } from "../../utils/bankCode";
import SelectDropdown from "react-native-select-dropdown";
import { formatCurrency, removeFormatting } from "../../utils/format-money";

function Transfer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [value, setValue] = useState(0);
  const [document, setDocument] = useState("");
  const [bank, setBank] = useState("");
  const [personType, setPersonType] = useState("");
  const [name, setName] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [cpfError, setCpfError] = useState(false);
  const [changeInformation, setChangeInformation] = useState(false);
  const [IdTransaction, setIdTransaction] = useState("");
  const [show, setShow] = useState(false);
  const handleShowPassword = () => setShow(!show);

  const requireErro = useMemo(
    () =>
      value === 0 ||
      agency === "" ||
      account === "" ||
      document === "" ||
      bank === "" ||
      name === "" ||
      personType === "",
    [account, agency, bank, document, name, personType, value]
  );

  function handleClearFields() {
    setAgency("");
    setAccount("");
    setValue(0);
    setDocument("");
    setBank("");
    setName("");
    setIsPassword("");
    setLoading(false);
    setModalVisible(false);
    setShowPassword(false);
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

  const validCPF = (cpf: string) => {
    if (cpf.length === 11) {
      const cpfFormat = cpf;
      const valid = validCPFForReal(cpfFormat);
      if (valid) {
        setDocument(cpf);
        setCpfError(false);
      } else {
        showToast("CPF inválido.");
        setDocument("");

        setCpfError(true);
      }
    } else {
      return;
    }
  };

  const verifyBalance = () => {
    if (balance > Number(value)) {
      setShowPassword(true);
    } else {
      showToast("Verifique seu saldo e tente novamente");
      return false;
    }
  };

  async function handleSendTed() {
    if (balance > Number(value)) {
      try {
        if (requireErro || isPassword === "" || cpfError) return;
        setLoading(true);
        const ted = await SendTed({
          Agencia: agency,
          Banco: bank,
          Conta: account,
          Documento: document,
          Nome: name,
          Password: isPassword,
          TipoPessoa: personType,
          Valor: removeFormatting(value),
        });

        if (ted.data.Sucess) {
          //Chama Toast de sucesso
          showToast(ted.data.Message);
          setIdTransaction(ted.data.Object.Id);
          setModalVisible(true);
          setChangeInformation(true);
        } else {
          showToast(ted.data.Message);
        }
      } catch (error) {
        handleClearFields();
        showToast("Aconteceu algo de errado!");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("Verifique seu saldo e tente novamente");
    }
  }

  useEffect(() => {
    clientBalance();
  }, []);

  const findBank = (bank: string) => {
    return " " + bankCode.filter((item) => item.code === bank)[0].name;
  };

  const findBankCode = (bank: string) => {
    return setBank(bankCode.filter((item) => item.name === bank)[0].code);
  };

  const validCPFTotal = (value: string) => {
    const cpfFormatted = value
      .replace("-", "")
      .replace(".", "")
      .replace(".", "");
    setDocument(cpfFormatted);
    validCPF(cpfFormatted);
  };

  const dropdownStyle = {
    backgroundColor: "#ffffff",
    // Outros estilos de estilo podem ser adicionados aqui
  };

  const inputStyle = {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 12,
    border: "3px solid #DDDDDD",
  };

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
    setValue(newValue);
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    })
      .format(valor)
      .slice(2);
  }

  
  const handleTextChange = (text: any) => {
    const formattedText = formatCurrency(text);
    // @ts-ignore
    setPixAmountValue(formattedText);
  };


  return (
    <Container>
      <Header />

      <Main>
        <Title>Transferência</Title>

        {showPassword === false ? (
          <>
            <InputView>
              <Label>Banco</Label>

              <SelectDropdown
                data={bankCode.map((item) => item.name)}
                defaultButtonText="Selecione..."
                onSelect={(selectedItem) => {
                  findBankCode(selectedItem);
                }}
                buttonStyle={inputStyle}
                dropdownStyle={dropdownStyle} // Passa o estilo personalizado para o dropdown
              />
            </InputView>

            <Input
              overTitle="Agência"
              value={agency}
              setValue={setAgency}
              onChange={setAgency}
            />

            <Input
              overTitle="Conta"
              value={account}
              setValue={setAccount}
              onChange={setAccount}
            />

            <Input
              overTitle="Nome"
              value={name}
              setValue={setName}
              onChange={setName}
            />

            <Input
              overTitle="CPF"
              value={cpfMask(document)}
              setValue={setDocument}
              onChange={validCPFTotal}
            />

            <InputView>
              <Label>Tipo da pessoa</Label>
              <SelectDropdown
                data={["PF", "PJ"]}
                defaultButtonText="Selecione..."
                onSelect={(selectedItem) => {
                  setPersonType(selectedItem);
                }}
                buttonStyle={inputStyle}
                dropdownStyle={dropdownStyle} // Passa o estilo personalizado para o dropdown
              />
            </InputView>
            {/* <Input
              overTitle="Valor"
              value={String(value)}
              setValue={setValue}
              onChange={mascaraMoeda}
            /> */}

            <Input
              overTitle="Digite o valor"
              value={value}
              setValue={handleTextChange}
              keyboardType="numeric"
            />  

            {/* <Separator />

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
            </TransferInfoContainer> */}

            <Row>
              <Button
                title="Cancelar"
                color="#E74343"
                onPress={() => {handleClearFields(); navigation.navigate('Payments')}}
              />
              <Button
                title="Confirmar"
                color="#6EA965"
                onPress={() => verifyBalance()}
              />
            </Row>
            <PD />
          </>
        ) : (
          <>
            <Input
              overTitle="Digite sua senha transacional"
              isPassword={true}
              setValue={setIsPassword}
              onChange={setIsPassword}
            />
            <BoxButton>
              <Button
                title="Cancelar"
                color="#E74343"
                onPress={() => {
                  handleClearFields();
                }}
              />
              <Button
                title="Transferir"
                color="#6EA965"
                onPress={() => handleSendTed()}
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
          <Title>Transação Realizada!</Title>

          <MainModal>
            <Text>Nome da pessoa: {name ? name : ""}</Text>
            <Text>
              Banco:
              {bank ? findBank(bank) : ""}
            </Text>
            <Text>Agência: {agency ? agency : ""}</Text>
            <Text>Conta: {account ? account : ""}</Text>
            <Text>CPF: {document ? cpfMask(document) : ""}</Text>
            <Text>ID de transação: {IdTransaction ? IdTransaction : ""}</Text>
            <Text>Data de transação: {new Date().toLocaleString()}</Text>

            <Row>
              <Button
                title="Fechar"
                color="#5266CE"
                onPress={() => {
                  setModalVisible(false), handleClearFields();
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
