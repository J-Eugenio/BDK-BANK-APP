import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const MainActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(15)}px;
  margin-bottom: ${RFValue(20)}px;
`;
