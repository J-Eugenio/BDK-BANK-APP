import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 95%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  margin-bottom: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;
  font-weight: 500;
  color: #585858;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(20)}px ${RFValue(20)}px;
  padding-bottom: 190px;
`;

export const MainActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(0)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const Flex = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(30)}px;
  align-items: center;
`;

export const FlexTitle = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${RFValue(8)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  color: #585858;
`;

export const LabelBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(8)}px;
  align-items: center;
`;

export const AmountValue = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: #f08e34;
`;

export const BtnDateOpen = styled.TouchableOpacity``;

export const BoxToItemPerList = styled.TouchableOpacity``;

export const ModalSuccess = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: ${RFValue(30)}px ${RFValue(30)}px;
`;

export const TitleBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(8)}px;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`;

export const DownloadButton = styled.TouchableOpacity`
  margin-top: ${RFValue(6)}px;
`;

export const ModalBox = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${RFValue(6)}px;
  align-items: flex-start;
  width: 300px;
`;

export const FlexModal = styled.View`
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  gap: 3px;
`;

export const TextMessage = styled.Text`
  font-size: ${RFValue(18)}px;
`;

export const LabelText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 300;
  color: #585858;
  text-align: left;
`;

export const DividerModal = styled.View`
  width: 100%;
  height: 1px;
  border: 1px solid #0e669e;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;
export const SecondaryTitleModal = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #0e669e;
`;

export const LabelStrong = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
  color: #585858;
`;
export const BoxToOpenModal = styled.TouchableOpacity``;
