import loginAsset from '../../assets/login-page-asset.png';
import { ImageBackground } from 'react-native';
import {
  Container,
  PrimaryTitle,
  SecondTitle,
  TextContainer,
  Confirm,
  ConfirmText,
  CodeGroup,
  Code
} from './styles';
interface VerifyProps {
  route?: {
    params: {
      ChaveLogin: string
    }
  }
}

function VerifyAccount({ route }: VerifyProps){
  console.log(route)
  return (
    <Container>
      <ImageBackground
        source={loginAsset}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        <TextContainer>
          <PrimaryTitle>Confirmação</PrimaryTitle>
          <SecondTitle>de Login</SecondTitle>
        </TextContainer>

        <CodeGroup>
          <Code
            keyboardType='decimal-pad'
            maxLength={1}
          />
          <Code
            keyboardType='decimal-pad'
            maxLength={1}
          />
          <Code
            keyboardType='decimal-pad'
            maxLength={1}
          />
          <Code
            keyboardType='decimal-pad'
            maxLength={1}
          />
          <Code
            keyboardType='decimal-pad'
            maxLength={1}
          />
          <Code
            keyboardType='decimal-pad'
            maxLength={1}
          />
        </CodeGroup>
        
        <Confirm>
          <ConfirmText>Confirmar</ConfirmText>
        </Confirm>
      </ImageBackground>
    </Container>
  )
}

export { VerifyAccount }