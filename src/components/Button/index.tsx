import {
  Container,
  Text
} from './styles';

interface ButtonProps {
  color?: string;
  title?: string;
  onPress: () => void;
}

function Button({ onPress, color, title }: ButtonProps){
  return (
    <Container 
      color={color}
      onPress={onPress}
    >
      <Text>{title || "Default"}</Text>
    </Container>
  )
}

export {
  Button
}