import { useEffect, useState } from "react";
import {Platform} from 'react-native';
import { Header } from "../../components/Header";
import { Container, Title, Main, Label, Box, LabelBox, Flex, TitleBox, DownloadButton } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

function ExtractPerId() {
  const [extractItem, setExtractitem] = useState<any>({});

  useEffect(() => {
    setExtractitem({
      id: 1,
      name: "Fulano",
      cpf: "000000000",
      value: "200",
      date_transaction: new Date().toLocaleDateString("pt-BR"),
    });
  }, []);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf Content</title>
    <style>
      main {
        padding: 40px 20px;
        padding-bottom: 190px;
      }
  
      .Title {
        font-size: 30px;
        margin-bottom: 40px;
        font-weight: 500;
        color: #585858;
      }
  
      .Flex {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
  
      .Box {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 20px;
      }
  
      .Label {
        font-size: 20px;
        font-weight: 500;
        color: #585858;
      }
  
      .LabelBox {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
      }
  
      .AmountValue {
        font-size: 18px;
        font-weight: 500;
        color: #F08E34;
      }
    </style>
  </head>
  
  <body>
    <main>
      <span class="Title">Comprovante</span>
      <div class="Flex">
        <div class="Box">
          <div class="LabelBox">
            <span class="Label">Nome do Cliente
          </div>
          <span class="Label">extractItem.name
        </div>
      </div>
      </div>
      <div class="Box">
        <div class="LabelBox">
          <span class="Label">CNPJ / CPF
        </div>
        <span class="Label">extractItem.cpf
      </div>
      </div>
      </div>
      <div class="Box">
        <div class="LabelBox">
          <span class="Label">Data de transação
        </div>
        <span class="Label">extractItem.date_transaction
      </div>
      </div>
      </div>
      <div class="Box">
        <div class="LabelBox">
          <span class="Label">Valor
        </div>
        <span class="Label">R$ extractItem.value
      </div>
      </div>
      </div>
      </div>
    </main>
  </body>
  
  </html>
  `;

  const createAndSavePDF = async (html: any) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Header />

      <Main>
        <TitleBox>
          <Title>Comprovante</Title>
          <DownloadButton onPress={() => createAndSavePDF(htmlContent)}>
            <Icon name="download" size={30} color="#00214E" />
          </DownloadButton>
        </TitleBox>
        <Flex>
          <Box>
            <LabelBox>
              <Label>Nome do Cliente</Label>
              <Label>{extractItem.name}</Label>
            </LabelBox>
          </Box>
          <Box>
            <LabelBox>
              <Label>CNPJ / CPF</Label>
              <Label>{extractItem.cpf}</Label>
            </LabelBox>
          </Box>
          <Box>
            <LabelBox>
              <Label>Data de transação</Label>
              <Label>{extractItem.date_transaction}</Label>
            </LabelBox>
          </Box>
          <Box>
            <LabelBox>
              <Label>Valor</Label>
              <Label>R$ {extractItem.value}</Label>
            </LabelBox>
          </Box>
        </Flex>
      </Main>
    </Container>
  );
}

export { ExtractPerId };
