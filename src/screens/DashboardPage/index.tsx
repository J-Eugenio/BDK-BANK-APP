import React from "react";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from "../../components/Flex/Row";

import { Header } from "../../components/Header";
import { LastTransactionItem } from "../../components/LastTransactionItem";
import { MainActionBtn } from "../../components/MainActionBtn";
import {
  Container,
  Title,
  Main,
  AmountContainer,
  AmountText,
  AmountValue,
  ShowAmount,
  SecondaryText,
  MainActionContainer,
  Separete,
} from "./styles";
import { ClienteSaldo, Extract } from "../../service/ApiPaymentsRoutes";
import { formatMoney } from "../../utils/format-money";
import { ActivityIndicator } from "react-native";
import { showToast } from "../../utils/toast";
import Footer from "../../components/Footer";

function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [initialDate, setInitialDate] = useState(
    String(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1)
        .toISOString()
        .slice(0, 10)
    )
  );
  const [lastDate, setLastDate] = useState(
    String(new Date().toISOString().slice(0, 10))
  );
  const handleSetVisibleBalance = () => setIsVisible(!isVisible);
  const [extractList, setExtractList] = useState<Array<any>>([]);

  const clientBalance = async () => {
    setLoading(true);
    await ClienteSaldo()
      .then((res) => {
        if (res.data.Sucess === true) {
          setBalance(res.data.Object.valorDisponivel);
        } else {
          showToast(`${res.data.Message}`);
          setBalance(0);
        }
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ExtractLists = async (iDate: string, lDate: string) => {
    setLoadingExtract(true);
    await Extract(iDate, lDate)
      .then((res) => {
        const balances = res.data.Object.saldos;
        const releases = balances.map((item: any) => item.lancamentos);
        const debts = [];
        for (let index = 0; index < releases.length; index++) {
          const element = releases[index];
          for (let index = 0; index < element.length; index++) {
            const object = element[index];
            debts.push(object);
          }
        }

        if (!res.data.Sucess) {
          showToast(`${res.data.Message}`);
        }

        setExtractList(
          debts
            .slice(-10)
            .sort((a: any, b: any) =>
              a.dateAt > b.dateAt ? -1 : b.dateAt > a.dateAt ? 1 : 0
            )
        );
      })
      .catch(() => {
        setLoadingExtract(false);
      })
      .finally(() => {
        setLoadingExtract(false);
      });
  };

  useEffect(() => {
    ExtractLists(initialDate, lastDate);
    clientBalance();
  }, []);

  return (
    <Container>
      <Header />

      <Main>
        <Title>Página principal</Title>

        <AmountContainer>
          <Row>
            <AmountText>Saldo</AmountText>
            <ShowAmount onPress={() => handleSetVisibleBalance()}>
              <Icon
                name={isVisible ? "eye" : "eye-slash"}
                size={20}
                color="#616161"
              />
            </ShowAmount>
          </Row>
          {loading === true ? (
            <ActivityIndicator color={"#000"} size="large" />
          ) : (
            <AmountValue>
              {isVisible ? formatMoney.format(balance) : "R$ ----"}
            </AmountValue>
          )}
        </AmountContainer>

        <SecondaryText>Ações</SecondaryText>

        <MainActionContainer>
          <MainActionBtn title="Ted" iconName="repeat" page="Transfer" />
          <MainActionBtn title="Pix" iconName="dollar-sign" page="Pix" />
          <MainActionBtn title="Boleto" iconName="grid" page="Billet" />
          <MainActionBtn title="Extrato" iconName="list" page="Extract" />
        </MainActionContainer>

        <SecondaryText>Últimas transações</SecondaryText>
        {loadingExtract ? (
          <ActivityIndicator color={"#000"} size="large" />
        ) : (
          <>
            {extractList &&
              extractList.map((item) => {
                return (
                  <LastTransactionItem
                    key={item.id}
                    cliente={item.Pessoa ? item.Pessoa : "Não informado"}
                    type={item.movimento}
                    indentifyName={item.nomeidentificacao}
                    amount={item.valor}
                    date={item.dateAt}
                    id={item.id}
                    isProofAvaliable={item.Comprovant}
                  />
                );
              })}
          </>
        )}
        <Separete />
        <Footer />
      </Main>
    </Container>
  );
}

export { DashboardPage };
