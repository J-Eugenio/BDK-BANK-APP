import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 90%;
`;

export const Main = styled.ScrollView`
  padding: ${RFValue(40)}px ${RFValue(20)}px;
  padding-bottom: 20px;
`;

export const ImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #283b9f;
  border-radius: 50px;
  width: ${RFValue(95)}px;
  height: ${RFValue(95)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(90)}px;
  height: ${RFValue(90)}px;
`;

export const Title = styled.Text`
  margin-top: ${RFValue(20)}px;
  margin-left: ${RFValue(20)}px;
  color: #585858;
  font-size: ${RFValue(25)}px;
  font-weight: 500;
`;

export const UserName = styled.Text`
  color: #585858;
  font-size: ${RFValue(20)}px;
  font-weight: 500;
  margin-top: ${RFValue(15)}px;;
`;

export const AccInfoText = styled.Text`
  color: #585858;
  font-size: ${RFValue(15)}px;
  font-weight: 400;
  margin-top: ${RFValue(15)}px;;
`;

export const UserData = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const TabsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const TabText = styled.Text`
color: #585858;
font-size: ${RFValue(18)}px;
font-weight: 600;
margin-top: ${RFValue(15)}px;;
`;