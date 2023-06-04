import {
  Container,
  Text
} from './styles';

interface ButtonProps {
  color?: string;
  title?: string;
  onPress: () => void;
  width?: number
}

function Button({ onPress, color, title, width }: ButtonProps){
  return (
    <Container 
      color={color}
      onPress={onPress}
      width={width}
    >
      <Text>{title || "Default"}</Text>
    </Container>
  )
}

export {
  Button
}