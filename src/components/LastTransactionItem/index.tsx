import Icon from 'react-native-vector-icons/Feather';
import { Row } from '../Flex/Row';

import {
  Container,
  IconContainer
} from './styles';

function LastTransactionItem(){
  return (
    <Container>

      <Row>
        <IconContainer>
          <Icon 
            name="trello"
            color="#5266CE"
            size={50}
          />
        </IconContainer>
      </Row>
    </Container>
  )
}

export { LastTransactionItem }