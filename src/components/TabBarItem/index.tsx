import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  IconContainer,
  Title,
  Value,
} from './styles';
import { Col } from '../Flex/Col';

function TabBarItem(){
  return (
    <Container>
      <IconContainer>
        <Icon 
          name="user"
          color="#151940"
          size={30}
        />
      </IconContainer>
      <Col>
        <Title>Dono da conta</Title>
        <Value>Usuário</Value>
      </Col>
    </Container>
  )
}

export {
  TabBarItem
}