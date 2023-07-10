import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 85%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  margin-bottom: ${RFValue(20)}px;
  font-weight: 500;
  color: #585858;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(20)}px;
  padding-bottom: 190px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${RFValue(12)}px;
  width: 100%;
`;

export const ValueBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%
`;

export const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #585858;
  text-align: center;
  margin-bottom: ${RFValue(18)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
`;

export const TransferInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const TransferInfoText = styled.Text`
  text-align: left;
  color: #7F8192;
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  width: 100%;
  padding: 0 10px;
`;

export const ImageContainer = styled.View`
  border: 2px solid #283B9F;
  border-radius: 50px;
`;

export const AmountContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  width: 100%;
`;

export const AmountTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-right: ${RFValue(10)}px;
  font-weight: 500;
`;

export const AmountValue = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: #F08E34;
`;

export const BoxUserInfo = styled.View`
  width: 85%
`;

export const ModalSuccess = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  padding: ${RFValue(20)}px;
`;

export const MainModal = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
`;

export const Success = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: 20px;
`;

export const BoxButton = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:  ${RFValue(20)}px;
`;
export const ButtonCheckPixText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(18)}px;
`;

export const ButtonCheckPix = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${RFValue(20)}px 0;
  height: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.btn_primary_color};
  border-radius: 10px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
`