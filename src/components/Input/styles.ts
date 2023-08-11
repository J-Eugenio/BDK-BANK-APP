import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface OverTitleProps {
  color?: string;
}

interface MainProps {
  isError?: boolean;
  isArea?: boolean;
}
export const Container = styled.View``;

export const Main = styled.View<MainProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ isArea }) => isArea ? 'flex-start': 'center'};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.input_background};
  height: ${({ isArea }) => isArea ? `${RFValue(200)}px`: `${RFValue(40)}px`};
  padding: 0 ${RFValue(5)}px;
  border-radius: ${RFValue(10)}px;
  margin-bottom: ${RFValue(15)}px;
  border: 1px solid ${({ isError }) => isError ? '#C53030' : '#E9E9E9' };
  overflow: hidden;
  white-space: break-spaces;
`;

export const TextInput = styled.TextInput<MainProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.input_background};
  height: ${({ isArea }) => isArea ? `100%`: `${RFValue(50)}px`};
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(5)}px ${RFValue(5)}px;
`;

export const ShowPassword = styled.TouchableOpacity`
`;

export const ShowDateInput = styled.TouchableOpacity`
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

export const OverTitle = styled.Text<OverTitleProps>`
  font-size: ${RFValue(16)}px;
  margin-bottom: 5px;
  color: ${({ color }) => color || '#616161'};
`;