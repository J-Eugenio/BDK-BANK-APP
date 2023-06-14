import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import loginAsset from "../../assets/login-page-asset.png";
import { ImageBackground } from "react-native";
import {
  Container,
  PrimaryTitle,
  SecondTitle,
  TextContainer,
  Confirm,
  ConfirmText,
  CodeGroup,
  Code,
} from "./styles";
import { loginConfirm } from "../../service/Apiroutes";
import { useAuth } from "../../hooks/auth";
import { ScreenProp } from "../../../App";
import { showToast } from "../../utils/toast";
interface VerifyProps {
  route?: {
    params: {
      ChaveLogin: string;
    };
  };
}

function VerifyAccount({ route }: VerifyProps) {
  console.log(route?.params.ChaveLogin);
  const [loading, setLoading] = useState(false);
  const [codeForLogin, setcodeForLogin] = useState("");
  const { auth, setData, signOut, token } = useAuth();
  const navigation = useNavigation<ScreenProp>();

  function handleEmailInput(e: any) {
    e.persist();
    const { value } = e.target;
    console.log(value, "value");

    setcodeForLogin((prevState: any) => ({
      ...prevState,
      codeForLogin: value,
    }));
  }

  const redirect = () => {
    navigation.navigate('Process');
  }

  const confirmLoginData = async () => {
    setLoading(true);
    const response = await loginConfirm(auth.ChaveLogin, codeForLogin);
    if (response.data.Sucess === true) {
      const obj = {
        token: response.data.Object.Token,
        user: response.data.Object,
      };
      await AsyncStorage.multiRemove(["@bdkbank:token", "@bdkbank:user"]);
      await AsyncStorage.multiSet([
        ["@bdkbank:token", response.data.Object.Token],
        ["@bdkbank:user", JSON.stringify(response.data.Object)],
      ]);
      setData(obj);
      showToast(response.data.Message);
      redirect()
    } else {
      showToast(response.data.Message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ImageBackground
        source={loginAsset}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        <TextContainer>
          <PrimaryTitle>Confirmação</PrimaryTitle>
          <SecondTitle>de Login</SecondTitle>
        </TextContainer>

        <CodeGroup>
          <Code
            value={codeForLogin}
            keyboardType="decimal-pad"
            maxLength={1}
            onChange={(e) => handleEmailInput(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChange={(e) => handleEmailInput(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChange={(e) => handleEmailInput(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChange={(e) => handleEmailInput(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChange={(e) => handleEmailInput(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChange={(e) => handleEmailInput(e)}
          />
        </CodeGroup>

        <Confirm>
          <ConfirmText>Confirmar</ConfirmText>
        </Confirm>
      </ImageBackground>
    </Container>
  );
}

export { VerifyAccount };
