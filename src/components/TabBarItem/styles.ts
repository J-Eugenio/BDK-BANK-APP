import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  height: ${RFValue(55)}px;
  border-bottom-width: 0.5px;
  border-bottom-color: #C4C4C4;
  padding-bottom: 4px;
  margin-bottom: 8px;
  margin-right: 8px;
`;

export const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${RFValue(55)}px;
  border: 2px solid #E2E2E299;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  color: #151940;
  font-size: ${RFValue(18)}px;
  font-weight: 500;
`;

export const Value = styled.Text`
  color: #C4C4C4;
  font-size: ${RFValue(18)}px;
  font-weight: 500;
`;
