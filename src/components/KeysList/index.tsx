import { BoxNameAndKey, BtnDeleteKey, Container, KeySubtitle, KeyTitle } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface keyInfo {
  keyid?: string;
  keyTitle?: string;
  keySubtitle?: string;
}

function KeysList({ keyid, keyTitle, keySubtitle }: keyInfo) {

  const handleDelete = () => {
    return console.log(keyid)
  }

  return (
    <Container>
      <BoxNameAndKey>
        <KeyTitle>{keyTitle}</KeyTitle>
        <KeySubtitle>{keySubtitle}</KeySubtitle>
      </BoxNameAndKey>
      <BtnDeleteKey onPress={() => handleDelete()}>
        <Icon name="times-circle" size={40} color="#FF6666" />
      </BtnDeleteKey>
    </Container>
  );
}

export { KeysList };
