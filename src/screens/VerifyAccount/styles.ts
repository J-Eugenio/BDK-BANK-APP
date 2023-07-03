import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonGroupProps {
  align?: "left" | "center" | "right";
}

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(100)}px ${RFValue(30)}px;
`;

export const PrimaryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(24)}px;
`;

export const SecondTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(18)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const TextContainer = styled.View`
  margin-bottom: ${RFValue(50)}px;
`;

export const Confirm = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${RFValue(50)}px 0;
  height: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.btn_primary_color};
  border-radius: 10px;
`;

export const ConfirmText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(18)}px;
`;

export const CodeGroup = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: ${RFValue(12)}px;
  margin-top: ${RFValue(18)}px;
`;
export const Code = styled.TextInput`
  height: ${RFValue(50)}px;
  width: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.input_background};
  border-radius: 10px;
  border: 1px solid grey
  text-align: center;
  font-size: ${RFValue(18)}px;
`;
