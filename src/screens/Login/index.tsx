import { useCallback, useState } from "react";
import { ImageBackground, ActivityIndicator } from "react-native";
import { Input } from "../../components/Input";
import loginAsset from "../../assets/login-page-asset.png";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../hooks/auth";
import {
  Container,
  PrimaryTitle,
  SecondTitle,
  TextContainer,
  ForgetPassword,
  ForgetPasswordText,
  ButtonGroup,
  Enter,
  EnterText,
  SignUp,
  SignUpText,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ScreenProp } from "../../../App";
import { cpfMask } from "../../utils/cfp-mask";

function Login() {
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<ScreenProp>();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    await signIn({
      document: cpf,
      password: password,
    });
    setLoading(false);
  }, [signIn, cpf, password]);

  return (
    <Container>
      <ImageBackground
        source={loginAsset}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        <TextContainer>
          <PrimaryTitle>Bem vindo</PrimaryTitle>
          <SecondTitle>Faça seu login</SecondTitle>
        </TextContainer>

        <Input
          value={cpfMask(cpf)}
          placeholder="CPF"
          setValue={setCPF}
          onChange={setCPF}
        />
        <Input
          value={password}
          placeholder="Senha"
          isPassword
          setValue={setPassword}
          onChange={setPassword}
        />

        <ButtonGroup align="right">
          <ForgetPassword onPress={() => navigation.navigate("Forgot")}>
            <ForgetPasswordText>Esqueceu a senha?</ForgetPasswordText>
          </ForgetPassword>
        </ButtonGroup>

        <Enter onPress={() => handleSignIn()} disabled={loading}>
          {loading ? (
            <>
              <ActivityIndicator color={"#FFF"} size="large" />
            </>
          ) : (
            <>
              <EnterText>Entrar</EnterText>
            </>
          )}
        </Enter>

        <SecondTitle>Não tem uma conta?</SecondTitle>
        <SignUp>
          <SignUpText>REGISTRE-SE</SignUpText>
          <Icon name="chevron-right" size={30} color="#FFF" />
        </SignUp>
      </ImageBackground>
    </Container>
  );
}

export { Login };
