import { ReactNode } from 'react';
import {
  Container
} from './styles';

interface RowProps {
  children: ReactNode;
  align?: 'center' | 'flex-end' | 'flex-start' |
  'space-between' | 'space-around'
}
function Row({ children, align }: RowProps){
  return(
    <Container align={align}>
      {children}
    </Container>
  )
}
export { Row }