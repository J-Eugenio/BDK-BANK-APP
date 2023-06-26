import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(100)}px ${RFValue(30)}px;
`;

export const PrimaryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(24)}px;
`;

export const Flex = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%
`
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  font-weight: 600;
  cursor: pointer;
`;