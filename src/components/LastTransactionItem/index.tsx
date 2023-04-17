import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  IconContainer,
  Client,
  PaymentDate,
  PaymentValue,
  Box,
  BoxRow
} from './styles';
import { useEffect, useState } from 'react';

interface LastTransactionProps {
  paymentValue?: number;
  paymentType?: 'received' | 'withdrew';
  paymentDate?: string;
  client?: string
}
function LastTransactionItem({ client, paymentType, paymentValue, paymentDate }: LastTransactionProps){
  const [payment, setPayment] = useState({
    color: '#E74343',
    msg: '(Transação)',
    ammountText: '- R$'
  })

  useEffect(() => {
    if(paymentType === 'received'){
      setPayment({
        color: '#6EA965',
        msg: '(Recebido)',
        ammountText: 'R$'
      })
    }
  }, [paymentType])

  return (
    <Container>
        <BoxRow>
          <IconContainer>
            <Icon 
              name="file"
              color="#5266CE"
              size={40}
            />
          </IconContainer>
          <Box>
            <Client>{client?.slice(0, 9)} <Client color={payment.color}>{payment.msg}</Client></Client>
            <PaymentDate>Pix - {paymentDate}</PaymentDate>
          </Box>
        </BoxRow>
        <PaymentValue>{`${payment.ammountText} ${paymentValue}`}</PaymentValue>
    </Container>
  )
}

export { LastTransactionItem }