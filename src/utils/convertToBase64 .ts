import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const resizeImage = async (uri: string) => {
  const resizedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800, height: 800 } }],
    { format: ImageManipulator.SaveFormat.JPEG, compress: 0.5 }
  );

  return resizedImage.uri;
};
const convertToBase64 = async (imageUri: string): Promise<string> => {
  try {
    
    const resizedPhoto = await resizeImage(imageUri);
    const base64Image = await FileSystem.readAsStringAsync(resizedPhoto, {
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