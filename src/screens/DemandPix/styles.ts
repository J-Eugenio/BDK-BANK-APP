import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface OverTitleProps {
  color?: string;
}

export const Container = styled.View`
  height: 95%;
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
  align-items: center;
  justify-content: center;
  padding: ${RFValue(12)}px;
`;

export const QRCode = styled.Image`
  width: 100%;
  height: ${RFValue(300)}px;
  margin-bottom: ${RFValue(18)}px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #585858;
  text-align: center;
  margin-bottom: ${RFValue(18)}px;
`;

export const CopyButton = styled.TouchableOpacity``;

export const Flex = styled.View`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  width: 100%;
`;

export const Text = styled.Text`
  font-size: 20px;
`;
export const ImageQr = styled.Image`
  width: ${RFValue(200)}px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${RFValue(20)}px 0;
  height: ${RFValue(50)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.btn_primary_color};
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(20)}px;
`;
export const TextError = styled.Text`
  font-size: 20px;
  color: red;
`;

export const InputView = styled.View`
  border-radius: 12px;
  margin-bottom: 20px;
`;

export const LabelTwo = styled.Text<OverTitleProps>`
  font-size: ${RFValue(16)}px;
  margin-bottom: 5px;
  color: ${({ color }) => color || "#616161"};
`;

export const BoxInputs = styled.View`
  width: 100%;
`