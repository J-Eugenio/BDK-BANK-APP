import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title
} from './styles';

import { Col } from '../../components/Flex/Col';

interface MainActionBtnProps {
  iconName?: string;
  title?: string;
}

function MainActionBtn({ iconName = "alert-circle", title = "default" }: MainActionBtnProps){
  return (
    <Container
      activeOpacity={0.6}
    >
      <Col>
        <Icon 
          name={iconName}
          color="#5266CE"
          size={30}
        />
        <Title>{title}</Title>
      </Col>
    </Container>
  )
}

export { MainActionBtn }