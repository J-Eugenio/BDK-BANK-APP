import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  display: flex;
  height: 80px;
  width: 80px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #E9E9E9;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

export const Title = styled.Text`
  color: #5266CE;
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  margin-top: 5px;
`;