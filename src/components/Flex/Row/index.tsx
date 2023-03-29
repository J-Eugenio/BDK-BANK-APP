import { ReactNode } from 'react';
import {
  Container
} from './styles';

interface RowProps {
  children: ReactNode;
}
function Row({ children }: RowProps){
  return(
    <Container>
      {children}
    </Container>
  )
}
export { Row }