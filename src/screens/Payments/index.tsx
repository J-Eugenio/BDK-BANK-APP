import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Title, Main, MainActionContainer } from "./styles";
import { MainActionBtn } from "../../components/MainActionBtn";

function Payments() {
  return (
    <Container>
      <Header />

      <Main>
        <Title>Pagamentos</Title>

        <MainActionContainer>
          <MainActionBtn
            title="Tranferência"
            iconName="repeat"
            page="Transfer"
          />
          <MainActionBtn title="Pix" iconName="dollar-sign" page="Pix" />
          <MainActionBtn title="Boleto" iconName="grid" page="Billet" />
          <MainActionBtn title="Extrato" iconName="list" page="Extract" />
        </MainActionContainer>
      </Main>
    </Container>
  );
}

export { Payments };
