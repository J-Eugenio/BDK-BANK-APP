import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid red;
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

export const PD = styled.View`
  height: ${RFValue(50)}px;
`;
