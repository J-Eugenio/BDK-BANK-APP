import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
  color?: string;
  width?: number
}
export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width ? `${RFValue(width)}px` : `${RFValue(154)}px`};
  height: ${RFValue(35)}px;
  background-color: ${({ color }) => color};
  border-radius: 10px;
`;

export const Text = styled.Text`
  color: #FFFFFF;
  font-size: ${RFValue(18)}px;
  font-weight: 500;
`;