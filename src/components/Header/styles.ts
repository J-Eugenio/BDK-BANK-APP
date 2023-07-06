import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${RFValue(50)}px;
  padding: 0 ${RFValue(10)}px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0,0,0,0.01);
`;

export const Logo = styled.Image`
width: ${RFValue(70)}px;
height: ${RFValue(50)}px;
`;
export const BtnNotifycation = styled.TouchableOpacity``;

export const Box = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`