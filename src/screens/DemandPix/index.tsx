import { Header } from "../../components/Header";
import {
  Container,
  Title,
  Main,
  QRCode,
  Box,
  Label,
  CopyButton,
} from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

function DemandPix() {
  function CopyToClipboard(containerId: any) {
    // @ts-ignore
    if (document.selection) {
      // @ts-ignore
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerId));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerId));
      // @ts-ignore
      window.getSelection().addRange(range);
      document.execCommand("copy");
    }
  }

  return (
    <Container>
      <Header />

      <Main>
        <Title>Cobrar alguém</Title>
        <Box>
          <Label>Leia o QR code abaixo</Label>

          <QRCode
            source={{
              uri: "https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png",
            }}
          />
          <Label>Ou mande a chave Pix copia e cola</Label>
          <CopyButton onPress={() => CopyToClipboard("copy_paste")}>
            <Icon name="copy" size={30} color="#00214E" />
          </CopyButton>
        </Box>
      </Main>
    </Container>
  );
}

export { DemandPix };
