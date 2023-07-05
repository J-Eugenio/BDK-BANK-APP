import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: ${RFValue(70)}px;
  border-bottom-width: 0.5px;
  border-bottom-color: #C4C4C4;
  padding: 10px;
  text-align: left;
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
  width: 100%;
  color: #151940;
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  text-align: left;

`;

export const Value = styled.Text`
  width: 100%;
  color: #C4C4C4;
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  text-align: left;
`;
