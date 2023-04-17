import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 85%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  margin-bottom: ${RFValue(20)}px;
  font-weight: 500;
  color: #585858;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(40)}px ${RFValue(20)}px;
  padding-bottom: 190px;
`;

export const Flex = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(50)}px;
  align-items: center;
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

export const BtnDateOpen = styled.TouchableOpacity``;

export const SecondaryText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.font_primary};
  margin-bottom: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;
`;

export const BoxToItemPerList = styled.TouchableOpacity``;