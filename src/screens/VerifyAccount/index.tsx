import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import loginAsset from "../../assets/login-page-asset.png";
import { ActivityIndicator, ImageBackground } from "react-native";
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
  const [loading, setLoading] = useState(false);
  const [codeForLogin01, setcodeForLogin01] = useState("");
  const [codeForLogin02, setcodeForLogin02] = useState("");
  const [codeForLogin03, setcodeForLogin03] = useState("");
  const [codeForLogin04, setcodeForLogin04] = useState("");
  const [codeForLogin05, setcodeForLogin05] = useState("");
  const [codeForLogin06, setcodeForLogin06] = useState("");
  const [codeToSendForLogin, setCodeToSendForLogin] = useState("")

  const { auth, setData, signOut, token } = useAuth();
  const navigation = useNavigation<ScreenProp>();

  const redirect = () => {
    navigation.navigate('Process');
  }

  useEffect(() => {
    setCodeToSendForLogin([codeForLogin01,codeForLogin02,codeForLogin03,codeForLogin04,codeForLogin05,codeForLogin06].join().replaceAll(",",""))
  },[
    codeForLogin01, 
    codeForLogin02, 
    codeForLogin03, 
    codeForLogin04, 
    codeForLogin05, 
    codeForLogin06
  ])
  const confirmLoginData = async () => {
    setLoading(true);
    const response = await loginConfirm(auth.ChaveLogin, codeToSendForLogin);
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
            keyboardType="decimal-pad"
            maxLength={1}
            onChangeText={(e) => setcodeForLogin01(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChangeText={(e) => setcodeForLogin02(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChangeText={(e) => setcodeForLogin03(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChangeText={(e) => setcodeForLogin04(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChangeText={(e) => setcodeForLogin05(e)}
          />
          <Code
            keyboardType="decimal-pad"
            maxLength={1}
            onChangeText={(e) => setcodeForLogin06(e)}
          />
        </CodeGroup>

        <Confirm onPress={() => confirmLoginData()}>
          {
            loading ? (
            <>
              <ActivityIndicator 
                color={"#FFF"}
                size="large"
              />
            </>
            ) : (
            <>
              <ConfirmText>Confirmar</ConfirmText>
            </>
            )
          }
        </Confirm>
      </ImageBackground>
    </Container>
  );
}

export { VerifyAccount };
