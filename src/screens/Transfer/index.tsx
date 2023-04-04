import { KeyboardAvoidingView, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import {
  Container,
  Title,
  Main,
  PD
} from './styles';
import { Separator } from '../../components/Separator';

function Transfer(){
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

        <Input 
          overTitle='Valor'
        />
        <Input 
          overTitle='Valor'
        />
        <Input 
          overTitle='Valor'
        />
        <PD />
      </Main>

    </Container>
  )
}

export {
  Transfer
}