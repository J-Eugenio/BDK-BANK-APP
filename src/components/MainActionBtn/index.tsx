import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title
} from './styles';

import { Col } from '../../components/Flex/Col';

interface MainActionBtnProps {
  iconName?: string;
  title?: string;
  page?: string;
}

function MainActionBtn({ iconName = "alert-circle", title = "default", page = "/" }: MainActionBtnProps){
  const navigation = useNavigation<any>();

  return (
    <Container
      activeOpacity={0.6}
      onPress={() => navigation.navigate(page)}
    >
      <Col>
        <Icon 
          name={iconName}
          color="#5266CE"
          size={24}
        />
        <Title>{title}</Title>
      </Col>
    </Container>
  )
}

export { MainActionBtn }