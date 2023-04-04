import { ImageBackground } from 'react-native';
import { Input } from '../../components/Input';
import loginAsset from '../../assets/login-page-asset.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  PrimaryTitle,
  SecondTitle,
  TextContainer,
  ForgetPassword,
  ForgetPasswordText,
  ButtonGroup,
  Enter,
  EnterText,
  SignUp,
  SignUpText
} from './styles';

function Login(){
  return (
    <Container>
      <ImageBackground
        source={loginAsset}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        <TextContainer>
          <PrimaryTitle>Bem vindo</PrimaryTitle>
          <SecondTitle>Faça seu login</SecondTitle>
        </TextContainer>
        
        <Input 
          placeholder='Email'
        />
        <Input 
          placeholder='Senha'
          isPassword
        />

        <ButtonGroup
          align='right'
        >
          <ForgetPassword>
            <ForgetPasswordText>Esqueceu a senha?</ForgetPasswordText>
          </ForgetPassword>
        </ButtonGroup>

        <Enter>
          <EnterText>Entrar</EnterText>
        </Enter>
        
        <SecondTitle>Não tem uma conta?</SecondTitle>
        <SignUp>
          <SignUpText>
            REGISTRE-SE
          </SignUpText>
          <Icon 
            name="chevron-right"
            size={30}
            color="#FFF"
          />
        </SignUp>
      </ImageBackground>
    </Container>
  )
}

export { Login }