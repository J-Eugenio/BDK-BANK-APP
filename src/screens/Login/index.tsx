import { useCallback, useState } from 'react';
import { ImageBackground } from 'react-native';
import { Input } from '../../components/Input';
import loginAsset from '../../assets/login-page-asset.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../hooks/auth';
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
  const [cpf, setCPF] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    setLoading(true)
    await signIn({
      document: cpf,
      password: password
    })
    setLoading(false)
  }, [signIn])

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
          value={cpf}
          placeholder='CPF'
          setValue={setCPF}
          onChange={setCPF}
        />
        <Input 
          value={password}
          placeholder='Senha'
          isPassword
          setValue={setPassword}
          onChange={setCPF}
        />

        <ButtonGroup
          align='right'
        >
          <ForgetPassword>
            <ForgetPasswordText>Esqueceu a senha?</ForgetPasswordText>
          </ForgetPassword>
        </ButtonGroup>

        <Enter
          onPress={() => handleSignIn()}
          disabled={loading}
        >
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