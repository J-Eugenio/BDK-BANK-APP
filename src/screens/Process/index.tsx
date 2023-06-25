import { useEffect } from "react";
import { Container, Title } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Process() {
  async function teste(){
    const test = await AsyncStorage.getItem("@bdkbank:user")

    console.log(test)
  }

  useEffect(() => {
    teste()
  })
  return (
    <Container>
      <Title>Processo da conta</Title>
    </Container>
  );
}

export { Process };
