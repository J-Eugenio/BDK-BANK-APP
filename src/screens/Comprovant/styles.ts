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
