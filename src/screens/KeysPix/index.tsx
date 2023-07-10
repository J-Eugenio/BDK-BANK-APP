import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { Header } from "../../components/Header";
import {
  Container,
  Title,
  Main,
  BoxTitle,
  BtnNewKey,
  BoxButton,
  ModalSuccess,
  ModalContainer,
  TitleBox,
  Box,
  BoxSelect,
  OverTitle,
  MainModal,
  Success,
} from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { KeysList } from "../../components/KeysList";
import { CreateKeyPix, ListKeyPix } from "../../service/ApiPaymentsRoutes";
import { showToast } from "../../utils/toast";

interface ListKeysDTO {
  Id: number;
  Chave: string;
  TypeKeyPix: number;
}

function KeysPix() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyType, setKeyType] = useState("");
  const [keyName, setKeyName] = useState("");
  const [statusChange, setStatusChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listKeys, setListKeys] = useState<Array<ListKeysDTO>>([]);
  const navigation = useNavigation<any>();

  const listKeysPix = async () => {
    await ListKeyPix().then((res) => {
      if (res.data.Sucess === true) {
        if (res.data.Message === "Sem dados") {
          setListKeys([
            {
              Id: 0,
              Chave: "Nenhuma chave encontrada",
              TypeKeyPix: 5,
            },
          ]);
        } else {
          setListKeys(res.data.Object);
        }
      }
    });
  };

  const namePerKeyType = (keyType: number) => {
    let keyName = "";
    switch (keyType) {
      case 0:
        keyName = "CPF";
        break;
      case 1:
        keyName = "CNPJ";
        break;
      case 2:
        keyName = "E-Mail";
        break;
      case 3:
        keyName = "Celular";
        break;
      case 4:
        keyName = "Chave Aleatória";
        break;
      case 5:
        keyName = "Desculpe";
        break;
      default:
        break;
    }
    return keyName;
  };

  const validateKeyPix = (keyType: string) => {
    if (keyType === "4") {
      return "";
    } else {
      return keyName;
    }
  };

  const handleCreateKeyPix = async () => {
    setLoading(true);
    const payload = {
      Key: validateKeyPix(keyType),
      Type: Number(keyType),
    };

    await CreateKeyPix(payload)
      .then((res) => {
        if (res.data.Sucess) {
          setStatusChange(true);
          listKeysPix();
        } else {
          showToast(res.data.Message);
        }
      })
      .catch(() => {
        showToast("Falha ao registrar o novo Pix");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    listKeysPix();
  }, []);

  return (
    <Container>
      <Header />

      <Main>
        <BoxTitle>
          <Title>Minhas chaves</Title>
          <BtnNewKey onPress={() => setModalVisible(true)}>
            <Icon name="plus-circle" size={50} color="#6EA965" />
          </BtnNewKey>
        </BoxTitle>
        {listKeys.length > 0 ? (
          <>
            {listKeys &&
              listKeys.map((item) => {
                return (
                  <KeysList
                    key={item.Id}
                    id={item.Id}
                    keyTitle={namePerKeyType(item.TypeKeyPix)}
                    keySubtitle={item.Chave}
                  />
                );
              })}
          </>
        ) : (
          ""
        )}
      </Main>
      <ModalSuccess
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          {statusChange === false ? (
            <>
              <TitleBox>
                <Title>Nova Chave</Title>
              </TitleBox>

              <Box>
                <OverTitle>Tipo de chave pix</OverTitle>
                <BoxSelect>
                  <RNPickerSelect
                    onValueChange={(value: any) => setKeyType(value)}
                    placeholder={{ label: "Selecione um item..." }}
                    items={[
                      { label: "E-mail", value: "2" },
                      { label: "Telefone", value: "3" },
                      { label: "CNPJ", value: "1" },
                      { label: "CPF", value: "0" },
                      { label: "Chave Aleatória", value: "4" },
                    ]}
                  />
                </BoxSelect>
              </Box>

              {keyType === "4" ? (
                ""
              ) : (
                <Box>
                  <Input
                    value={keyName}
                    overTitle="Digite a chave pix"
                    setValue={setKeyName}
                    onChange={setKeyName}
                  />
                </Box>
              )}

              <BoxButton>
                {(keyType.length > 0 && keyName.length > 0) ||
                (keyType.length > 0 && keyType === "4") ? (
                  <>
                    <Button
                      title="Gerar Chave"
                      color="#6EA965"
                      onPress={() => handleCreateKeyPix()}
                    />
                  </>
                ) : (
                  ""
                )}

                <Button
                  title="Voltar"
                  color="#5266CE"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </BoxButton>
            </>
          ) : (
            <>
              <Title>Nova Chave</Title>
              <MainModal>
                <Icon name="check-square-o" size={120} color="#6EA965" />

                <Success>Chave criada com sucesso!</Success>

                <Button
                  title="Voltar"
                  color="#5266CE"
                  onPress={() => {
                    setModalVisible(false), setStatusChange(false);
                    setKeyName("");
                  }}
                />
              </MainModal>
            </>
          )}
        </ModalContainer>
      </ModalSuccess>
    </Container>
  );
}

export { KeysPix };
