import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 85%;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(20)}px;
  padding-bottom: 190px;
`;

export const BoxTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(10)}px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: 500;
  color: #585858;
`;

export const BtnNewKey = styled.TouchableOpacity``;

export const ModalSuccess = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #F4F4F4;
  padding: ${RFValue(30)}px ${RFValue(30)}px;
`;

export const TitleBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${RFValue(8)}px;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: ${RFValue(20)}px;;
`
export const BoxSelect = styled.View`
  background: #fff;
  width: 100%;
  height: ${RFValue(50)}px;
  border: 1px solid #E9E9E9;
  border-radius: ${RFValue(10)}px;
  padding: 0 ${RFValue(5)}px;
`
export const OverTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  margin-bottom: 5px;
  color: #616161;
`;
export const BoxButton = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;
`;

export const MainModal = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
`;

export const Success = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: 20px;
`;