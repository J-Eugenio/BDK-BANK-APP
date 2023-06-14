import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(20)}px ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(34)}px;
  color: ${({ theme }) => theme.colors.font_white};
  font-weight: 500;
`;
