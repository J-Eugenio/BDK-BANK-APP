import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Row } from '../../components/Flex/Row';

import { Header } from '../../components/Header';
import { LastTransactionItem } from '../../components/LastTransactionItem';
import { MainActionBtn } from '../../components/MainActionBtn';
import {
  Container,
  Title,
  Main,
  AmountContainer,
  AmountText,
  AmountValue,
  ShowAmount,
  SecondaryText,
  MainActionContainer,
  Separete
} from './styles';

function MainPage(){
  const [amount, setAmount] = useState('R$ 0,00');
  const [ShowAmountValue, setShowAmountValue] = useState(true);

  function handleShowAmountValue(){
    setShowAmountValue(oldValue => !oldValue);
  }

  useEffect(() => {
    if(ShowAmountValue){
      setAmount('R$ 0,00');
      return;
    }

    setAmount('R$ --,--')
  }, [ShowAmountValue])

  return(
    <Container>
      <Header />
      
      <Main>
        <Title>Página principal</Title>

        <AmountContainer>
          <Row>
            <AmountText>Saldo</AmountText>
            <ShowAmount
              onPress={() => handleShowAmountValue()}
            >
              <Icon 
                name={ShowAmountValue ? 'eye' : 'eye-slash'}
                size={20}
                color='#616161'
              />
            </ShowAmount>
          </Row>
          <AmountValue>{amount}</AmountValue>
        </AmountContainer>

        <SecondaryText>Ações</SecondaryText>

        <MainActionContainer>
          <MainActionBtn 
            title='Tranferência'
            iconName='repeat'
          />
          <MainActionBtn 
            title='Pix'
            iconName='dollar-sign'
          />
          <MainActionBtn 
            title='Boleto'
            iconName='grid'
          />
          <MainActionBtn 
            title='Extrato'
            iconName='list'
          />
        </MainActionContainer>

        <SecondaryText>Últimas transações</SecondaryText>

        <LastTransactionItem 
          client='Teste User'
          paymentDate={new Date().toLocaleString()}
          paymentType='received'
          paymentValue={200}
        />
        <LastTransactionItem 
          client='Teste User2'
          paymentDate={new Date().toLocaleString()}
          paymentType='withdrew'
          paymentValue={100}
        />
        <LastTransactionItem 
          client='Teste User2'
          paymentDate={new Date().toLocaleString()}
          paymentType='withdrew'
          paymentValue={10000}
        />

        <Separete />
      </Main>

    </Container>
  )
}

export { MainPage }