import { useEffect, useState } from "react";
import { Container, Title, Flex, SubTitle, Button } from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenProp } from "../../../App";
import { SafeAreaView, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

function Process() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({} as any);
  const navigation = useNavigation<ScreenProp>();

  const getUserData = async () => {
    const user = await AsyncStorage.getItem("@bdkbank:user");
    setUserInfo(user);
    verifyProcessStep(user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const verifyProcessStep = (data: any) => {
    setLoading(true);
    if (data.Processo === 0) {
      setLoading(false);
      navigation.navigate("VerifyStatus", { id: "phone" });
    }
    if (data.Processo === 10) {
      setLoading(false);
      navigation.navigate("VerifyStatus", { id: "email" });
    }
    if (data.Processo === 20) {
      setLoading(false);
    }
    if (data.Processo === 30) {
      setLoading(false);
    }
    if (data.Processo === 40) {
      navigation.navigate("MainPage");
    }
  };

  const backToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Container>
      {loading === false ? (
        <Flex>
          <Title>Caro {userInfo.Name}</Title>

          <SubTitle>
            Seus dados estão sendo análisados pelo banco para aprovação.
          </SubTitle>

          <Button disabled={loading} onPress={() => backToLogin()}>
            VOLTAR
          </Button>
        </Flex>
      ) : (
        <>
          <Flex>
            <SafeAreaView style={{ flex: 1 }}>
              <Spinner
                visible={loading}
                textContent={"Carregando dados... aguarde."}
                textStyle={styles.spinnerTextStyle}
              />
            </SafeAreaView>
          </Flex>
        </>
      )}
    </Container>
  );
}

export { Process };
