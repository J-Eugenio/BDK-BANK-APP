import React from "react";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from "../../components/Flex/Row";
import { Button } from "../../components/Button";
import Bdk from "../../assets/logo.png";
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
  ModalContainer,
  ModalSuccess,
  TitleBox,
  Logo,
  ModalBox,
  FlexModal,
  TextMessage,
  DividerModal,
  SecondaryTitleModal,
  LabelStrong,
  BoxToOpenModal,
  LabelBox,
  LabelText,
} from "./styles";
import {
  ClienteSaldo,
  Extract,
  ProofById,
} from "../../service/ApiPaymentsRoutes";
import { formatMoney } from "../../utils/format-money";
import { ActivityIndicator } from "react-native";
import { showToast } from "../../utils/toast";
import Footer from "../../components/Footer";
import DownloadPDF from "../../components/DownloadPDF";
import { Box, Label } from "../CopyAndPastePix/styles";

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
  const [loadingData, setLoadingData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [proofData, setProofData] = useState({} as any);
  const [proofMessage, setProofMessage] = useState("");
  const [proofExists, setProofExists] = useState(false);

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
        setLoading(false);
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
        setLoadingExtract(false);
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

  const listProofById = async (id: string, type: string) => {
    setLoadingData(true);
    setModalVisible(true);
    const payload = {
      ComprovanteId: id,
      TipoMovimentacao: type,
    };
    await ProofById(payload)
      .then((res) => {
        if (res.data.Sucess === false) {
          setProofMessage(res.data.Message);
          setProofExists(true);
        } else {
          setProofData(res.data.Object);
        }
        setLoadingData(false);
      })
      .catch(() => {})
      .finally(() => {
        setLoadingData(false);
      });
  };

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
                  <BoxToOpenModal
                    key={item.id}
                    onPress={() => {
                      listProofById(item.Identifier, item.nomeidentificacao);
                    }}
                  >
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
                  </BoxToOpenModal>
                );
              })}
          </>
        )}
        <Separete />
        <Footer />
      </Main>
      <ModalSuccess
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          <TitleBox>
            <Logo source={Bdk} resizeMode="contain" />
            {loadingData === true ? (
              ""
            ) : (
              <DownloadPDF data={proofData} />
              // <DownloadButton onPress={() => callDownloadBillet()}>
              //   <Icon name="download" size={30} color="#00214E" />
              // </DownloadButton>
            )}
          </TitleBox>
          <ModalBox>
            {loadingData === true ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlexModal>
                {proofExists === true ? (
                  <FlexModal>
                    <Box>
                      <TextMessage>{proofMessage}</TextMessage>
                    </Box>
                  </FlexModal>
                ) : (
                  <FlexModal>
                    <Title>
                      {proofData.Title ? proofData.Title : "Comprovante"}
                    </Title>

                    <LabelBox>
                      <Label>Valor</Label>
                      <LabelText>
                        {formatMoney.format(proofData.Valor)}
                      </LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>ID da transação</Label>
                      <LabelText>{proofData.Id ? proofData.Id : ""}</LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>Realizada em:</Label>
                      <LabelText>
                        {new Date(proofData.Date).toLocaleString()}
                      </LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>Canal de solicitação:</Label>
                      <LabelText>
                        {proofData.CanalDeSolicitacao
                          ? proofData.CanalDeSolicitacao
                          : ""}
                      </LabelText>
                    </LabelBox>
                    <DividerModal></DividerModal>
                    <SecondaryTitleModal>Dados do Cliente</SecondaryTitleModal>
                    <LabelBox>
                      <Label>Nome:</Label>
                      <LabelText>
                        {proofData.From ? proofData.From.From : ""}
                      </LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>Banco:</Label>
                      <LabelText>
                        {proofData.From ? proofData.From.FromBank : ""}
                      </LabelText>
                    </LabelBox>
                    <DividerModal></DividerModal>
                    <SecondaryTitleModal>Beneficiário</SecondaryTitleModal>
                    <LabelBox>
                      <Label>Recebido por:</Label>
                      <LabelText>
                        {proofData.To ? proofData.To.ToName : ""}
                      </LabelText>
                    </LabelBox>
                    <LabelBox>
                      <LabelStrong>Valor de transferência via:</LabelStrong>
                      <LabelText>
                        {proofData.FormaDeTranferencia
                          ? proofData.FormaDeTranferencia
                          : ""}
                      </LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>Observação:</Label>
                      <LabelText>{proofData.Observacao}</LabelText>
                    </LabelBox>
                  </FlexModal>
                )}
              </FlexModal>
            )}

            <Button
              title="Fechar"
              color="#5266CE"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </ModalBox>
        </ModalContainer>
      </ModalSuccess>
    </Container>
  );
}

export { DashboardPage };
