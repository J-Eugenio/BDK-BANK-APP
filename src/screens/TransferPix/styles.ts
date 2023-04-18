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
  padding: ${RFValue(20)}px;
  padding-bottom: 190px;
`;

export const Box = styled.ScrollView`
  padding: ${RFValue(10)}px 0;
`;

export const BtnNewTransactionPix = styled.TouchableOpacity`
  border: 1px solid #D5D5D5;
  border-radius: ${RFValue(12)}px;;
  width: 53%;
  padding: ${RFValue(20)}px;
`;

export const LabelBtn = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  color: #5266CE;
`;

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

export const TransferInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const TransferInfoText = styled.Text`
  text-align: left;
  color: #7F8192;
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  width: 100%;
  padding: 0 10px;
`;

export const ImageContainer = styled.View`
  border: 2px solid #283B9F;
  border-radius: 50px;
`;

export const AmountContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  width: 100%;
`;

export const AmountTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-right: ${RFValue(10)}px;
  font-weight: 500;
`;

export const AmountValue = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: #F08E34;
`;

export const Image = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
`;

export const BoxButton = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:  ${RFValue(20)}px;
`;
