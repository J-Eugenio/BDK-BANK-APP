import React from "react";
import { View, Button } from "react-native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Bdk from "../../assets/logo.png";
import { formatMoney } from "../../utils/format-money";

export default function DownloadPDF({data}: any) {
  const generatePDF = async () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body>
        <div style="padding: 4px; display: flex; flex-direction: column; align-items: flex-start; text-align: left; width: 100%; gap: 3px;">
        <h2 style="font-size: 18px; font-weight: 500; color: #0e669e;">Comprovante</h2>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Valor</span>
          <span style="font-size: 14px; color: #888888;">${formatMoney.format(
            data.Valor
          )}</span>
        </div>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">ID da transação</span>
          <span style="font-size: 14px; color: #888888;">${data.Id ? data.Id : ''}}</span>
        </div>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Realizada em:</span>
          <span style="font-size: 14px; color: #888888;">${new Date(data.Date).toLocaleString()}</span>
        </div>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Canal de solicitação:</span>
          <span style="font-size: 14px; color: #888888;">${data.CanalDeSolicitacao ? data.CanalDeSolicitacao : ''}</span>
        </div>
        
        <hr style="width: 100%; height: 1px; border: 1px solid #0e669e; margin-top: 16px; margin-bottom: 16px;">
        
        <h3 style="font-size: 18px; font-weight: 500; color: #0e669e;">Dados do Cliente</h3>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Nome:</span>
          <span style="font-size: 14px; color: #888888;">${data.From ? data.From.From : ''}</span>
        </div>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Banco:</span>
          <span style="font-size: 14px; color: #888888;">${data.From ? data.From.FromBank : ''}</span>
        </div>
        
        <hr style="width: 100%; height: 1px; border: 1px solid #0e669e; margin-top: 16px; margin-bottom: 16px;">
        
        <h3 style="font-size: 18px; font-weight: 500; color: #0e669e;">Beneficiário</h3>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Recebido por:</span>
          <span style="font-size: 14px; color: #888888;">${data.To ? data.To.ToName : ''}</span>
        </div>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <strong style="font-size: 16px; font-weight: 600; color: #585858;">Valor de transferência via:</strong>
          <span style="font-size: 14px; color: #888888;">${data.FormaDeTranferencia ? data.FormaDeTranferencia : ''}</span>
        </div>
        
        <div style="margin-top: 10px; padding-y: 15px;">
          <span style="color: #434343;">Observação:</span>
          <span style="font-size: 14px; color: #888888;">${data.Observacao}</span>
        </div>
      </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (fileInfo.exists) {
        const destinationUri = FileSystem.documentDirectory + "exemplo.pdf";
        await FileSystem.copyAsync({
          from: uri,
          to: destinationUri,
        });

        Sharing.shareAsync(destinationUri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Baixar" onPress={generatePDF} />
    </View>
  );
}
