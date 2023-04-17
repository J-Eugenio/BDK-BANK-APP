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

export const PD = styled.View`
  height: ${RFValue(50)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
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
  color: #7f8192;
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  width: 100%;
  padding: 0 10px;
`;

export const ImageContainer = styled.View`
  border: 2px solid #283b9f;
  border-radius: 50px;
`;

export const AmountContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  width: 100%;
`;

export const AmountTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-right: ${RFValue(10)}px;
  font-weight: 500;
`;

export const AmountValue = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #f08e34;
`;

export const ModalSuccess = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
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
