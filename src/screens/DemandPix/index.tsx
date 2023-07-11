import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Header } from "../../components/Header";
import {
  Container,
  Title,
  Main,
  QRCode,
  Box,
  Label,
  CopyButton,
  Flex,
  Text,
  ImageQr,
  ButtonText,
  Button,
  TextError,
  InputView,
  BoxInputs,
} from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { CreateQrCode, ListKeyPix } from "../../service/ApiPaymentsRoutes";
import { TextInput } from "react-native";
import { Input } from "../../components/Input";
import SelectDropdown from "react-native-select-dropdown";

interface ListKeysDTO {
  Id: number;
  Chave: string;
  TypeKeyPix: number;
}

interface QrCodeInfoProps {
  payload: string;
  qrCodeB64: string;
}

function DemandPix() {
  const [isCreateQrCode, setIsCreateQrCode] = useState(false);
  const [disableButtonCreateQrCode, setDisableButtonCreateQrCode] = useState(
    false
  );
  const [listKeys, setListKeys] = useState<Array<ListKeysDTO>>([]);
  const [qrCodeValue, setQrCodeValue] = useState(0);
  const [qrCodeDescription, setQrCodeDescription] = useState("");
  const [qrCodeKey, setQrCodeKey] = useState<string | null>(null);
  const [qrCodeInfo, setQrCodeInfo] = useState<QrCodeInfoProps>();

  const isErrorQrCodeKey = useMemo(() => !qrCodeKey, [qrCodeKey]);
  const isErrorQrCodeValue = useMemo(() => qrCodeValue === 0, [qrCodeValue]);
  const canCreateQrCode = useMemo(() => !!qrCodeKey, [qrCodeKey]);
  const [isCopied, setIsCopied] = useState(false);
  const [imageURL, setImageURl] = useState("");

  async function copyTextToClipboard(text: any) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(qrCodeInfo?.payload)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listKeysPix = async () => {
    await ListKeyPix().then((res) => {
      if (res.data.Sucess === true) {
        setListKeys(res.data.Object);
      } else {
        setListKeys([
          {
            Id: 0,
            Chave: "Nenhuma chave encontrada",
            TypeKeyPix: 5,
          },
        ]);
      }
    });
  };

  const handleCreateQrCode = useCallback(() => {
    setDisableButtonCreateQrCode(true);
    CreateQrCode({
      descricao: qrCodeDescription,
      KeyPixSelected: qrCodeKey,
      valor: qrCodeValue,
    }).then((res) => {
      if (res?.data.Sucess) {
        setQrCodeInfo({
          payload: res.data.Object.PayLoad,
          qrCodeB64: res.data.Object.Base64,
        });
        setImageURl(`data:image/jpeg;base64,${res.data.Object.Base64}`);
        setIsCreateQrCode(true);
        setDisableButtonCreateQrCode(false);
      }
    });
  }, [qrCodeDescription, qrCodeKey, qrCodeValue]);

  useEffect(() => {
    listKeysPix();
  }, []);

  function mascaraMoeda(event: any) {
    console.log(event, 'teste')
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
    setQrCodeValue(Number(newValue));
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    })
      .format(valor)
      .slice(2);
  }

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

  return (
    <Container>
      <Header />

      <Main>
        {isCreateQrCode ? (
          <>
            <Flex>
              <Text>Mande o QR Code abaixo</Text>
              <img src={imageURL} width={200} />
            </Flex>
            <Flex>
              <Text>
                Ou mande a chave Pix copia e cola{" "}
                <button onClick={() => handleCopyClick()}>
                  <Icon name="check-square-o" color="#5266CE" size={24} />
                </button>
              </Text>

              <TextInput
                id="copy_paste"
                value={qrCodeInfo?.payload}
                multiline
                numberOfLines={4}
                maxLength={40}
                style={{ padding: 10 }}
              />
            </Flex>
          </>
        ) : (
          <Flex>
            <InputView>
              <Label>Selecione uma chave pix</Label>
              <SelectDropdown
                data={listKeys?.map((key) => key.Chave)}
                defaultButtonText="Selecione..."
                onSelect={(selectedItem) => {
                  setQrCodeKey(selectedItem);
                }}
                buttonStyle={inputStyle}
                dropdownStyle={dropdownStyle} // Passa o estilo personalizado para o dropdown
              />
            </InputView>

            {!isErrorQrCodeKey ? (
              <TextError>Chave Pix obrigatorio.</TextError>
            ) : (
              ""
            )}
            <BoxInputs>
              <Text>Valor R$</Text>
              <Input value={String(qrCodeValue)} setValue={setQrCodeValue} onChange={mascaraMoeda} />

              <Text>Descricao</Text>
              <Input
                setValue={setQrCodeDescription}
                onChange={setQrCodeDescription}
              />

              <Button
                disabled={disableButtonCreateQrCode}
                onPress={() => handleCreateQrCode()}
              >
                <ButtonText>Gerar QrCode</ButtonText>
              </Button>
            </BoxInputs>
          </Flex>
        )}
      </Main>
    </Container>
  );
}

export { DemandPix };
