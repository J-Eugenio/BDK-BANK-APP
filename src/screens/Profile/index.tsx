import { Header } from '../../components/Header';
import {
  Container,
  ImageContainer,
  Image,
  Title,
  Main,
  UserName,
  AccInfoText,
} from './styles';
import UserIMG from '../../assets/user-img.png';

function Profile(){
  return (
    <Container>
      <Header />

      <Title>Minha conta</Title>

      <Main>
        <ImageContainer>
          <Image 
            source={UserIMG}
            resizeMode="contain"
          />
        </ImageContainer>

        <UserName>Usuário</UserName>

        <AccInfoText>Agência: 00000</AccInfoText>
        <AccInfoText>Conta: 00000</AccInfoText>
      </Main>
    </Container>
  )
}

export {
  Profile
}