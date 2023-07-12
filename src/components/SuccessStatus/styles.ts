import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
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
