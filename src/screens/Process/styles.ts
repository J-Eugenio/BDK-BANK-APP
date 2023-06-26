import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(20)}px ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.font_white};
  font-weight: 500;
`;

export const Flex = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 2;
  margin-bottom: ${RFValue(3)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.font_white};
  font-weight: 500;
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
