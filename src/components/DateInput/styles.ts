import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  
`;

export const Main = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${RFValue(50)}px;
  padding: 0 ${RFValue(5)}px;
  margin-bottom: ${RFValue(15)}px;
  overflow: hidden;
`;

export const TextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.input_background};
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;
  padding: 0 ${RFValue(5)}px;
  flex: 1;
`;

export const OverTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: 5px;
  color: #616161;
`;

export const OverTitleConainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  width: 100%;
`;