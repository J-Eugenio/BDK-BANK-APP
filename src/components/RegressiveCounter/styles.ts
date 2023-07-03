import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const TextTime = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(18)}px;
  margin-top:  ${RFValue(16)}px;
`;
