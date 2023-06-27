import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(100)}px ${RFValue(20)}px;
  width: 100%
`;

export const PrimaryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(24)}px;
`;

export const MainFlex = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%
  padding: 6px;
`
export const Box = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(8)}px;
  gap: 8px;
`

export const Flex = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${RFValue(8)}px;
  gap: 8px;
`

export const FlexStart = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 80%
  margin-bottom: ${RFValue(8)}px;
  gap: 8px;
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  font-weight: 600;
`;

export const MiniText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(14)}px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${RFValue(50)}px 0;
  height: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.btn_primary_color};
  border-radius: 10px;
`;

