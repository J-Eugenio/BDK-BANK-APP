import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

interface ButtonGroupProps {
  align?: 'left' | 'center' | 'right'
}

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_login};
  padding: ${RFValue(100)}px ${RFValue(30)}px;
`;

export const PrimaryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(30)}px;
`;

export const SecondTitle = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(18)}px;
`;

export const TextContainer = styled.View`
  margin-bottom: ${RFValue(50)}px;
`;

export const ForgetPassword = styled.TouchableOpacity`
  display: flex;
  width: ${RFValue(200)}px;
  align-items: center;
`;
export const ForgetPasswordText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(18)}px;
  text-decoration: underline;
`;

export const ButtonGroup = styled.View<ButtonGroupProps>`
  display: flex;
  align-items: ${({ align }) => 
    align == 'left' ? 'flex-start' :
    align ==  'center' ? ' center' : 'flex-end'
  };
`;

export const Enter = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${RFValue(50)}px 0;
  height: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.btn_primary_color};
  border-radius: 10px;
`;
export const EnterText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(20)}px;
`;

export const SignUp = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

export const SignUpText = styled.Text`
  color: ${({ theme }) => theme.colors.font_white};
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(10)}px;
`;

