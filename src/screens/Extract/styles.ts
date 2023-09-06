import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 100%;
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

export const Flex = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(30)}px;
  align-items: center;
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
  text-align: left;
  margin-top: ${RFValue(14)}px;;
  margin-bottom: -5px;
`;

export const LabelText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 300;
  color: #585858;
  text-align: left;

`;

export const LabelBox = styled.View`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: ${RFValue(8)}px;
`;

export const AmountValue = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #f08e34;
`;

export const BtnDateOpen = styled.TouchableOpacity``;

export const SecondaryText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.font_primary};
  margin-bottom: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;
`;

export const BoxToItemPerList = styled.TouchableOpacity``;

export const ModalSuccess = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: ${RFValue(30)}px ${RFValue(30)}px;
`;

export const MainModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${RFValue(20)}px;
`;

export const Success = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: 20px;
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

export const ModalBox = styled.ScrollView`
  display: flex;
  flex-direction: column;
  gap: ${RFValue(6)}px;
  width: 300px;
  height: 100%;
`;

export const BoxExtract = styled.View`
  margin-top: 10px;
  padding-y: 15px;
`;
export const TextExtract = styled.Text`
  color: #434343;
`;

export const SubTextExtract = styled.Text`
  font-size: 14px;
  color: #888888;
`;

export const FlexButtonShowMore = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(80)}px;
  margin-top: ${RFValue(20)}px;
`;

export const ButtonShowMore = styled.TouchableOpacity`
  background: transparent;
`;

export const ButtonShowMoreText = styled.Text`
  color: #5266ce;
  font-size: ${RFValue(18)}px;
`;

export const BoxToOpenModal = styled.TouchableOpacity``;

export const Logo = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(60)}px;
`;

export const TextMessage = styled.Text`
  font-size: ${RFValue(18)}px;
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
