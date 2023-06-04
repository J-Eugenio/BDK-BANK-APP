import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface OverTitleProps {
  color?: string;
}

export const Container = styled.View` 
`;

export const Main = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.input_background};
  height: ${RFValue(50)}px;
  padding: 0 ${RFValue(5)}px;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(15)}px;
  border: 1px solid #E9E9E9;
  overflow: hidden;
`;

export const TextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.input_background};
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;
  padding: 0 ${RFValue(5)}px;
  flex: 1;
`;

export const ShowPassword = styled.TouchableOpacity`
`;

export const ShowDateInput = styled.TouchableOpacity`
`;

export const OverTitle = styled.Text<OverTitleProps>`
  font-size: ${RFValue(16)}px;
  margin-bottom: 5px;
  color: ${({ color }) => color || '#616161'};
`;