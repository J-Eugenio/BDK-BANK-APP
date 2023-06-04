import * as FileSystem from 'expo-file-system';

const convertToBase64 = async (imageUri: string): Promise<string> => {
  try {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Image;
  } catch (error) {
    console.log('Erro ao converter a imagem para base64:', error);
    return '';
  }
};

export {
  convertToBase64
}