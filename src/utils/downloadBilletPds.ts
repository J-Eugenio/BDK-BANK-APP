import { Platform } from "react-native";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export const createAndSavePDF = async () => {
  const htmlContent : any = `
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

  try {
    const { uri } = await Print.printToFileAsync(htmlContent);
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
};
