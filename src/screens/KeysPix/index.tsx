import { useState } from "react";
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

function KeysPix() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyType, setKeyType] = useState("");
  const [keyName, setKeyName] = useState("");
  const [statusChange, setStatusChange] = useState(false);
  const navigation = useNavigation<any>();

  const createNewKey = async () => {
    setStatusChange(true);
  };

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
        <KeysList keyid="1" keyTitle="CPF" keySubtitle="000000000-00" />
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
                    onValueChange={(value) => setKeyType(value)}
                    placeholder={{ label: "Selecione um item..." }}
                    items={[
                      { label: "E-mail", value: "email" },
                      { label: "Telefone", value: "phone" },
                      { label: "CPF", value: "cpf" },
                      { label: "Chave Aleatória", value: "randomKey" },
                    ]}
                  />
                </BoxSelect>
              </Box>

              <Box>
                <Input overTitle="Digite a chave pix" setValue={setKeyName} />
              </Box>

              <BoxButton>
                {keyType.length > 0 && keyName.length > 0 ? (
                  <>
                    <Button
                      title="Gerar Chave"
                      color="#6EA965"
                      onPress={() => createNewKey()}
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
