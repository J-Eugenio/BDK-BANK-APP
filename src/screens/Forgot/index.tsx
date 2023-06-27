import * as React from "react";
import {
  Container,
  PrimaryTitle,
  Flex,
  Text,
  MainFlex,
  FlexStart,
  Button,
  MiniText,
  Box,
} from "./styles";
import { showToast } from "../../utils/toast";
import {
  RecoverPassword,
  RecoverPasswordConfirmation,
} from "../../service/Apiroutes";
import { cpfMask, cpfMaskRemove, validCPF } from "../../utils/cfp-mask";
import { useNavigation } from "@react-navigation/native";
import { ScreenProp } from "../../../App";
import { ImageBackground, ActivityIndicator } from "react-native";
import loginAsset from "../../assets/login-page-asset.png";
import { Input } from "../../components/Input";

function Forgot() {
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const navigation = useNavigation<ScreenProp>();
  const [cpfCnpj, setCpfCnpj] = React.useState("");
  const [validateCode, setValidateCode] = React.useState(0);
  const [newPassword, setNewPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isCPFValid, setIsCPFValid] = React.useState(0);
  const [stepForgot, setStepForgot] = React.useState(0);
  const [show1, setShow1] = React.useState(false);
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);
  const handleShowPassword1 = () => setShow1(!show1);

  function redirect() {
    navigation.navigate("Login");
  }

  const handleForgotPassword = async () => {
    setLoading(true);

    const validCPF = validCPFForTrueOrFalse();
    if (validCPF) {
      setIsCPFValid(1);
      await RecoverPassword(cpfMaskRemove(cpfCnpj))
        .then((res) => {
          if (res.data.Sucess === true) {
            setEmail(res.data.Object.Email);
            showToast(res.data.Message);
            setStepForgot(1);
          } else {
            showToast(res.data.Message);
          }
        })
        .catch(() => {
          showToast("Ocorreu uma falha!");
        })
        .finally(() => {
          setLoading(false);
        });
      setLoading(false);
    } else {
      setIsCPFValid(2);
      setLoading(false);
    }
  };

  const handleConfirmForgotPassword = React.useCallback(async () => {
    setLoading1(true);
    const validPassword = validPasswordCaractersAndNumbers();
    if (validPassword) {
      const payload = {
        Cpf: cpfCnpj,
        Codigo: Number(validateCode),
        Senha: newPassword,
      };
      await RecoverPasswordConfirmation(payload)
        .then((res) => {
          if (res.data.Sucess === true) {
            showToast(res.data.Message);
            redirect();
          } else {
            showToast(res.data.Message);
          }
        })
        .catch(() => {
          showToast("Ocorreu uma falha!");
        })
        .finally(() => {
          setLoading1(false);
        });
    } else {
      setLoading1(false);
    }
  }, [cpfCnpj, validateCode, newPassword]);

  const validCPFForTrueOrFalse = () => {
    const isValid = validCPF(cpfCnpj);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  const validPasswordCaractersAndNumbers = () => {
    // contain numbers and letters
    const validOne = /^[A-Za-z0-9]*$/.test(newPassword);
    if (validOne === true) {
      setNewPassword(newPassword);
    } else {
      showToast("Senha não válida!");
      setNewPassword("");
    }
    return validOne;
  };

  return (
    <Container>
      <ImageBackground
        source={loginAsset}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        {stepForgot === 0 ? (
          <MainFlex>
            <FlexStart>
              <PrimaryTitle>Esqueceu sua senha?</PrimaryTitle>
              <Text>Digite seu CPF abaixo para recuperar sua senha.</Text>
            </FlexStart>

            <FlexStart>
              <Text>CPF</Text>
              <Box>
                <Input
                  value={cpfMask(cpfCnpj)}
                  placeholder="CPF"
                  setValue={setCpfCnpj}
                  onChange={setCpfCnpj}
                />
              </Box>
              {isCPFValid === 2 ? <Text>CPF não é válido</Text> : ""}

              <Box>
                <Button
                  onPress={() => handleForgotPassword()}
                  disabled={loading}
                >
                  {loading === true ? (
                    <ActivityIndicator color={"#FFF"} size="large" />
                  ) : (
                    <Text>ENVIAR</Text>
                  )}
                </Button>
              </Box>
            </FlexStart>
          </MainFlex>
        ) : (
          ""
        )}
        {stepForgot === 1 ? (
          <MainFlex>
            <FlexStart>
              <PrimaryTitle>Altere sua senha</PrimaryTitle>
              <Text>
                {showPasswordInput === false
                  ? "Digite o código abaixo que recebeu no E-mail " +
                    email.slice(0, 5) +
                    "**********" +
                    "@" +
                    email.split("@")[1]
                  : "Digite a nova senha"}
              </Text>
            </FlexStart>

            <FlexStart>
              <Text>Código</Text>
              <Box>
                <Input
                  value={String(validateCode)}
                  placeholder="Código"
                  setValue={setValidateCode}
                  onChange={setValidateCode}
                />
              </Box>

              {showPasswordInput === true ? (
                <>
                  <FlexStart>
                    <Text>Senha</Text>
                    <Box>
                      <Input
                        value={newPassword}
                        placeholder="Senha"
                        isPassword
                        setValue={setNewPassword}
                        onChange={setNewPassword}
                      />
                    </Box>
                    <MiniText>(Com 6 letras / números) *</MiniText>
                  </FlexStart>

                  <Box>
                    <Button
                      onPress={() => handleConfirmForgotPassword()}
                      disabled={loading1}
                    >
                      {loading === true ? (
                        <ActivityIndicator color={"#FFF"} size="large" />
                      ) : (
                        <Text>ALTERAR SENHA</Text>
                      )}
                    </Button>
                  </Box>
                </>
              ) : (
                <Box>
                  <Button
                    onPress={() => setShowPasswordInput(true)}
                    disabled={loading}
                  >
                    {loading === true ? (
                      <ActivityIndicator color={"#FFF"} size="large" />
                    ) : (
                      <Text>CONFIRMAR CÓDIGO</Text>
                    )}
                  </Button>
                </Box>
              )}
            </FlexStart>
          </MainFlex>
        ) : (
          ""
        )}
      </ImageBackground>
    </Container>
  );
}

export { Forgot };
