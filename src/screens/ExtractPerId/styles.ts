import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 85%;
`;

export const TitleBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(8)}px;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  margin-bottom: ${RFValue(40)}px;
  margin-top: ${RFValue(-8)}px;
  font-weight: 500;
  color: #585858;
`;

export const DownloadButton = styled.TouchableOpacity``;

export const Main = styled.ScrollView`
  padding: ${RFValue(20)}px;
  padding-bottom: 190px;
`;

export const Flex = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${RFValue(15)}px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${RFValue(8)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(20)}px;
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
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #F08E34;
`;



