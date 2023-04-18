import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ClientTextProps {
  color?: string;
}

export const Container = styled.View`
  padding: ${RFValue(8)}px ${RFValue(8)}px;
  border-bottom-width: 1px;
  border-bottom-color: #E2E2E2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const IconContainer = styled.View`
  border: 2px solid #E2E2E299;
  border-radius: 5px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: ${RFValue(8)}px;
`

export const BoxRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Client = styled.Text<ClientTextProps>`
  width: 80%
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ color }) => color ? color : '#000'};
`;

export const PaymentDate = styled.Text`
  color: #7F8192;
  font-size: ${RFValue(12)}px;
`;

export const PaymentValue = styled.Text`
  font-size: ${RFValue(14)}px;
`;
