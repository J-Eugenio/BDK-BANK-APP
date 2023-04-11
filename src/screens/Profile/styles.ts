import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 90%;
`;

export const Main = styled.View`
  display: flex;
  align-items: center;
  padding: ${RFValue(30)}px ${RFValue(20)}px;
  border: 1px solid red;
`;

export const ImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #283B9F;
  border-radius: 50px;
  width: ${RFValue(85)}px;
  height: ${RFValue(85)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
`;

export const Title = styled.Text`
  margin: ${RFValue(20)}px;
  color: #585858;
  font-size: ${RFValue(25)}px;
  font-weight: 500;
`;

export const UserName = styled.Text`

`;

export const AccInfoText = styled.Text`

`;
