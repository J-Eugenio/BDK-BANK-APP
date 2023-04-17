import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 85%;
`;

export const Title = styled.Text`
font-size: ${RFValue(24)}px;
  margin-bottom: ${RFValue(20)}px;
  font-weight: 500;
  color: #585858;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(40)}px ${RFValue(20)}px;
  padding-bottom: 190px;
`;


export const Box = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(12)}px;
`

export const QRCode = styled.Image`
  width: 100%;
  height: ${RFValue(300)}px;
  margin-bottom: ${RFValue(18)}px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: #585858;
  text-align: center;
  margin-bottom: ${RFValue(18)}px;
`;

export const CopyButton = styled.TouchableOpacity``;