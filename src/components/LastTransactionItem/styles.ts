import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ClientTextProps {
  color?: string;
}

interface PaymentValueTextProps {
  color?: string;
}

export const Container = styled.View`
  padding: ${RFValue(8)}px ${RFValue(8)}px;
  width: 100%;
`;

export const ActionClick = styled.TouchableOpacity`
  padding: ${RFValue(8)}px ${RFValue(8)}px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IconContainer = styled.View`
  border: 2px solid #e2e2e299;
  border-radius: 5px;
  padding: 6px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: ${RFValue(8)}px;
  width: 100%;
`;

export const BoxRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Client = styled.Text<ClientTextProps>`
  width: 80%
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${({ color }) => (color ? color : "#000")};
`;

export const TypeOfTransaction = styled.Text<ClientTextProps>`
  width: 80%
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ color }) => (color ? color : "#000")};
  margin-left: -10px;
`;

export const PaymentDate = styled.Text`
  color: #7f8192;
  margin-left: -10px;
  font-size: ${RFValue(12)}px;
`;

export const PaymentValue = styled.Text<PaymentValueTextProps>`
  font-size: ${RFValue(16)}px;
  color: ${({ color }) => (color ? color : "#000")};
  width: 100%;
  display: flex;
  text-align: right;
  justify-content: flex-end;
`;
