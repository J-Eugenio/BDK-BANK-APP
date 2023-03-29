import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  BtnNotifycation,
  Logo
} from './styles';

import Test from '../../assets/test.png';

function Header(){
  return(
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
      }}
    >
      <Logo 
        source={Test}
        resizeMode="contain"
      />

      <BtnNotifycation>
          <Icon 
            name="bell"
            size={30}
            color="#00214E"
          />
      </BtnNotifycation>
    </Container>
  )
}

export { Header }