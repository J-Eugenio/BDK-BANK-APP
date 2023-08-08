import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(20)}px ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(34)}px;
  color: ${({ theme }) => theme.colors.font_white};
  font-weight: 500;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.font_white};
  margin: ${RFValue(20)}px 0;
`;

export const Main = styled.View`
  flex: 1;
`;

export const PermissionContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PermissionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(10)}px;
  margin-bottom: ${RFValue(20)}px;
`;
export const DocumentContainer = styled.View`
  border: 1px solid red;
  width: 48%;
  height: 45%;
  margin-bottom: 10px;
`;

export const MainDocuments = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ImagePreview = styled.View`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
`;

export const ImagePreviewFile = styled.Image`
  border-radius: 8px;
`;

export const CameraMain = styled.View`
  border: 5px solid red;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 0;
`;

export const FlipCamera = styled.TouchableOpacity``;

export const BoxError = styled.View`
  background: #f47521;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  color: #FFF;
`;
