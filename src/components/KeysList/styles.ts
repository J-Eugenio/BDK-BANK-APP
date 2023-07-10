import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(20)}px;
`;

export const BoxNameAndKey = styled.View`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export const KeyTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #585858;
`;
export const KeySubtitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 400;
  color: #585858;
`;

export const BoxButtons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: ${RFValue(14)}px;
`

export const BtnCopyKey = styled.TouchableOpacity``;
export const BtnDeleteKey = styled.TouchableOpacity``;
