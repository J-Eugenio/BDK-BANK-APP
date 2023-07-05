import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  BtnNotifycation,
  Logo,
  Box
} from './styles';

import Bdk from '../../assets/bdk.png';
import { useAuth } from '../../hooks/auth';

function Header(){
  const { signOut } = useAuth();

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
        source={Bdk}
        resizeMode="contain"
      />
      <Box>
        {/* <BtnNotifycation>
            <Icon 
              name="bell"
              size={30}
              color="#00214E"
            />
        </BtnNotifycation> */}
        <BtnNotifycation onPress={() => signOut()}>
            <Icon 
              name="sign-out"
              size={30}
              color="#00214E"
            />
        </BtnNotifycation>
      </Box>
    </Container>
  )
}

export { Header }