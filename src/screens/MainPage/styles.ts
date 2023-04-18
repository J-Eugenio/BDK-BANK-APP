import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 85%;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(40)}px ${RFValue(20)}px;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.font_primary};
  margin-bottom: ${RFValue(10)}px;
`;

export const AmountContainer = styled.View`
  border: 2px solid #ddd;
  width: ${RFValue(215)}px;
  height: ${RFValue(80)}px;
  padding: ${RFValue(10)}px;
  border-radius: 6px;
  align-items: center;
  margin-bottom: ${RFValue(20)}px;
`;

export const AmountText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.font_primary};
`;

export const AmountValue = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.font_primary};
  font-weight: 500;
`;

export const ShowAmount = styled.TouchableOpacity``;

export const SecondaryText = styled.Text`
  font-size: ${RFValue(25)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.font_primary};
  margin-bottom: ${RFValue(20)}px;
`;

export const MainActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(15)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const Separete = styled.View`
  height: ${RFValue(50)}px;
`;
