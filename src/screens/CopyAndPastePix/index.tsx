import { useState } from "react";
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
} from "./styles";
import { Separator } from "../../components/Separator";
import UserIMG from "../../assets/user-img.png";
import { Button } from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

function CopyAndPastePix() {
  const [pixCopyAndPasteKey, setPixCopyAndPasteKey] = useState("");
  const [pixCopyAndPasteValue, setPixCopyAndPasteValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<any>();

  return (
    <Container>
      <Main>
        <Title>Pix Copia e Cola</Title>

        {showPassword === false ? (
          <>
            <Box>
              <Input
                overTitle="Cole ou digite a chave aleatória"
                setValue={setPixCopyAndPasteKey}
              />
              {pixCopyAndPasteKey.length > 0 ? (
                <>
                  <AmountInput
                    overTitle="Digite o valor"
                    setValue={setPixCopyAndPasteValue}
                  />
                </>
              ) : (
                ""
              )}

              {pixCopyAndPasteValue.length > 0 ? (
                <>
                  <Separator />

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
                </>
              ) : (
                ""
              )}
              {pixCopyAndPasteValue.length > 0 &&
              pixCopyAndPasteKey.length > 0 ? (
                <>
                  <Button
                    title="Confirmar"
                    color="#6EA965"
                    onPress={() => setShowPassword(true)}
                  />
                </>
              ) : (
                ""
              )}
            </Box>
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
                onPress={() => navigation.navigate("Pix")}
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
          <MainModal>
            <Icon name="check-square-o" size={120} color="#6EA965" />

            <Success>Pix realizado!</Success>

            <BoxButton>
              <Button
                title="Ver Extrato"
                color="#F08E34"
                onPress={() => navigation.navigate("Extract")}
              />
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
