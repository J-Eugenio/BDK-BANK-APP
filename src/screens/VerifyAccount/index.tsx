import Icon from 'react-native-vector-icons/FontAwesome5';
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

function VerifyAccount(){
  return (
    <Container>
      <TextContainer>
        <PrimaryTitle>Confirmação</PrimaryTitle>
        <SecondTitle>de Login</SecondTitle>
      </TextContainer>

      <CodeGroup>
        <Code
          keyboardType='decimal-pad'
        />
        <Code
          keyboardType='decimal-pad'
        />
        <Code
          keyboardType='decimal-pad'
        />
        <Code
          keyboardType='decimal-pad'
        />
        <Code
          keyboardType='decimal-pad'
        />
        <Code
          keyboardType='decimal-pad'
        />
      </CodeGroup>
      
      <Confirm>
        <ConfirmText>Confirmar</ConfirmText>
      </Confirm>
    
    </Container>
  )
}

export { VerifyAccount }