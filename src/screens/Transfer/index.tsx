import { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import {
  Container,
  Title,
  Main,
  PD,
  Image,
  TransferInfoContainer,
  TransferInfoText,
  ImageContainer,
  AmountTitle,
  AmountValue,
  AmountContainer,
  ModalSuccess,
  ModalContainer,
  MainModal,
  Success
} from './styles';
import { Separator } from '../../components/Separator';
import { Col } from '../../components/Flex/Col';
import { Row } from '../../components/Flex/Row';
import { Button } from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserIMG from '../../assets/user-img.png';

function Transfer(){
  const [modalVisible, setModalVisible] = useState(false);

  return(
    <Container>
      <Header />
    
      <Main>
        <Title>Transferência</Title>

        <Input 
          overTitle='Agência'
        />

        <Input 
          overTitle='Conta'
        />

        <Input 
          overTitle='Valor'
        />

        <Separator />

        <TransferInfoContainer>
          <ImageContainer>
            <Image 
              source={UserIMG}
              resizeMode="contain"
            />
          </ImageContainer>
          
          <Col>
            <TransferInfoText>Agência: 0000-X</TransferInfoText>
            <TransferInfoText>Conta: 0000-X</TransferInfoText>
            <AmountContainer>
              <AmountTitle>Valor:</AmountTitle>
              <AmountValue>R$ 5,00</AmountValue>
            </AmountContainer>
          </Col>
        </TransferInfoContainer>

        <Row>
          <Button 
            title='Cancelar'
            color='#E74343'
            onPress={() => console.log("A")}
          />
          <Button 
            title='Confirmar'
            color='#6EA965'
            onPress={() => setModalVisible(true)}
          />
        </Row>
        <PD />
      </Main>

      <ModalSuccess
         animationType="slide"
         transparent={true}
         visible={modalVisible}
      >
        <ModalContainer>
          <Title>Transferência</Title>

          <MainModal>
            <Icon 
              name="check-square-o"
              size={120}
              color="#6EA965"
            />

            <Success>Transação realizada!</Success>

            <Row>
              <Button 
                title='Ver Extrato'
                color='#F08E34'
                onPress={() => console.log("A")}
              />
              <Button 
                title='Voltar'
                color='#5266CE'
                onPress={() => setModalVisible(false)}
              />
            </Row>
          </MainModal>
        </ModalContainer>
      </ModalSuccess>

    </Container>
  )
}

export {
  Transfer
}