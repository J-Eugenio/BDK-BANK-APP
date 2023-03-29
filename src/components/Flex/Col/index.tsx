import { ReactNode } from 'react';
import {
  Container
} from './styles';

interface ColProps {
  children: ReactNode;
}
function Col({ children }: ColProps){
  return(
    <Container>
      {children}
    </Container>
  )
}
export { Col }