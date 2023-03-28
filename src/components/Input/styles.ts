import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.input_background};
  height: ${RFValue(50)}px;
  padding: 0 ${RFValue(5)}px;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(15)}px;
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