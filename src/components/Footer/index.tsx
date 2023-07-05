import React from 'react'
import { Container, FooterBox, TextFooter } from "./styles";

export default function Footer() {

  return (
    <Container>
      <FooterBox>
        <TextFooter>
          ©2022 BDK BANCO SECURITIZADORA S.A. Alameda Santos, 1165 - sala 908
        </TextFooter>
        <TextFooter>Cerqueira César, São Paulo - SP, 01419-002</TextFooter>
        <TextFooter>
          E-mail: contato@bdksa.com.br | Telefone: | (11) 4210-5870 | SAC:
          0800-942-0457
        </TextFooter>
      </FooterBox>
    </Container>
  );
}
