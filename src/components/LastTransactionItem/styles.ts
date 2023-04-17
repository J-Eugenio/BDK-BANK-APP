import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ClientTextProps {
  color?: string;
}

export const Container = styled.View`
  padding: ${RFValue(8)}px ${RFValue(8)}px;
  border-bottom-width: 1px;
  border-bottom-color: #E2E2E2;
`;

export const IconContainer = styled.View`
  width: ${RFValue(56)}px;
  border: 2px solid #E2E2E299;
  border-radius: 5px;
  margin-right: ${RFValue(-30)}px;
`;

export const Client = styled.Text<ClientTextProps>`
  font-size: ${RFValue(20)}px;
  font-weight: 500;
  color: ${({ color }) => color ? color : '#000'};
`;

export const PaymentDate = styled.Text`
  color: #7F8192;
`;

export const PaymentValue = styled.Text`
  font-size: ${RFValue(18)}px;
`;
