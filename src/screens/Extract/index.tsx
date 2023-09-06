import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import {
  Container,
  Title,
  Main,
  Label,
  AmountValue,
  Box,
  BtnDateOpen,
  LabelBox,
  Flex,
  SecondaryText,
  BoxToItemPerList,
  ModalSuccess,
  ModalContainer,
  MainModal,
  Success,
  DownloadButton,
  TitleBox,
  ModalBox,
  BoxExtract,
  TextExtract,
  SubTextExtract,
  BoxToOpenModal,
  Logo,
  ButtonShowMore,
  FlexButtonShowMore,
  ButtonShowMoreText,
  TextMessage,
  FlexModal,
  DividerModal,
  SecondaryTitleModal,
  LabelStrong,
  LabelText,
} from "./styles";
import { DateInput } from "../../components/DateInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import { LastTransactionItem } from "../../components/LastTransactionItem";
import {
  Extract as ExtractListCall,
  ProofById,
} from "../../service/ApiPaymentsRoutes";
import { Button } from "../../components/Button";
import { createAndSavePDF } from "../../utils/downloadBilletPds";
import { formatMoney } from "../../utils/format-money";
import Bdk from "../../assets/logo.png";
import DownloadPDF from "../../components/DownloadPDF";

function Extract() {
  const [modalVisible, setModalVisible] = useState(false);
  const [proofData, setProofData] = useState({} as any);
  const [proofMessage, setProofMessage] = useState("");
  const [proofExists, setProofExists] = useState(false);
  const [showDateInit, setShowDateInit] = useState(false);
  const [showDateIEnd, setShowDateEnd] = useState(false);
  const [dateFilterInit, setDateFilterInit] = useState(new Date());
  const [dateFilterEnd, setDateFilterEnd] = useState(new Date());
  const [showQuantity, setShowQuantity] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [lastDate, setLastDate] = useState(
    String(new Date().toISOString().slice(0, 10))
  );
  const [extractList, setExtractList] = useState<Array<any>>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [currentInitialDate, setCurrentInitialDate] = useState("");
  const [currentFinalDate, setCurrentFinalDate] = useState("");

  const ExtractLists = async (iDate: string, lDate: string) => {
    setLoadingExtract(true);
    await ExtractListCall(iDate, lDate)
      .then((res) => {
        const balances = res.data.Object.saldos;
        const balancesSort = balances.sort((a: any, b: any) =>
          a.data > b.data ? -1 : b.data > a.data ? 1 : 0
        );
        setExtractList(balancesSort.slice(-10));
      })
      .catch(() => {
        setLoadingExtract(false);
      })
      .finally(() => {
        setLoadingExtract(false);
      });
  };

  useEffect(() => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    setCurrentInitialDate(`${year}-${month}-${day}`);
    setCurrentFinalDate(`${year}-${month}-${day}`);
  }, []);

  async function handleShowMoreProducts(showMore: number) {
    event?.preventDefault();
    setLoading(true);
    const showQuantityMore = showQuantity + showMore;
    setShowQuantity(showQuantityMore);
    const arr_with_limit = extractList.slice(0, showQuantityMore);
    setExtractList(arr_with_limit);
    setLoading(false);
  }

  useEffect(() => {
    var ourDate = new Date();

    var pastDate = ourDate.getDate() - 7;
    ourDate.setDate(pastDate);

    ExtractLists(ourDate.toISOString().slice(0, 10), lastDate);
  }, []);

  const callDownloadBillet = async () => {
    await createAndSavePDF();
  };

  const handleFilterPerDate = () => {
    ExtractLists(dateFilterInit.toISOString(), dateFilterEnd.toISOString());
    setShowDateEnd(false);
    setShowDateInit(false);
  };

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
        <Title>Extratos</Title>
        <Flex>
          <Box>
            <BtnDateOpen onPress={() => setShowDateInit(true)}>
              <LabelBox>
                <Label>Data Inicial</Label>
                <Icon name="calendar" size={20} color="#00214E" />
              </LabelBox>
            </BtnDateOpen>
            <AmountValue>
            {dateFilterInit.toLocaleDateString("pt-BR")}
            </AmountValue>
          </Box>
          <Box>
            <BtnDateOpen onPress={() => setShowDateEnd(true)}>
              <LabelBox>
                <Label>Data Final</Label>
                <Icon name="calendar" size={20} color="#00214E" />
              </LabelBox>
            </BtnDateOpen>
            <AmountValue>
              {dateFilterEnd.toLocaleDateString("pt-BR")}
            </AmountValue>
          </Box>
          <Box>
            <BtnDateOpen onPress={() => ExtractLists(String(dateFilterInit), String(dateFilterEnd))}>
              <Icon name="search" size={20} color="#00214E" />
            </BtnDateOpen>
          </Box>
        </Flex>
        {showDateInit ? (
          <DateInput
            value={dateFilterInit}
            setValue={setDateFilterInit}
            closeModal={handleFilterPerDate}
          />
        ) : (
          <></>
        )}
        {showDateIEnd ? (
          <DateInput
            value={dateFilterEnd}
            setValue={setDateFilterEnd}
            closeModal={handleFilterPerDate}
          />
        ) : (
          <></>
        )}
        <SecondaryText>Últimas transações</SecondaryText>
        {loadingExtract === true ? (
          <ActivityIndicator size="large" />
        ) : (
          <BoxToItemPerList>
            {extractList &&
              extractList.map((item) => {
                return (
                  <BoxExtract key={item.data}>
                    <TextExtract>
                      {new Date(item.data).toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? "Hoje," + new Date(item.data).toLocaleDateString()
                        : new Date(item.data).toLocaleDateString()}
                    </TextExtract>
                    <SubTextExtract>
                      Saldo disponível:{" "}
                      {formatMoney.format(item.valorDisponivel)}
                    </SubTextExtract>
                    {item.lancamentos &&
                      item.lancamentos.map((lancamento: any) => {
                        return (
                          <BoxToOpenModal
                            key={lancamento.id}
                            onPress={() => {
                              listProofById(
                                lancamento.Identifier,
                                lancamento.nomeidentificacao
                              );
                            }}
                          >
                            <LastTransactionItem
                              cliente={
                                lancamento.Pessoa
                                  ? lancamento.Pessoa
                                  : "Não informado"
                              }
                              type={lancamento.movimento}
                              indentifyName={lancamento.nomeidentificacao}
                              amount={lancamento.valor}
                              date={lancamento.dateAt}
                              id={lancamento.Identifier}
                              isProofAvaliable={lancamento.Comprovant}
                            />
                          </BoxToOpenModal>
                        );
                      })}
                  </BoxExtract>
                );
              })}
          </BoxToItemPerList>
        )}
        <FlexButtonShowMore>
          {loading === false ? (
            <ButtonShowMore onPress={() => handleShowMoreProducts(10)}>
              <ButtonShowMoreText>Mostrar Mais</ButtonShowMoreText>
            </ButtonShowMore>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </FlexButtonShowMore>
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
                      <LabelText>{formatMoney.format(proofData.Valor)}</LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>ID da transação</Label>
                      <LabelText>{proofData.Id ? proofData.Id : ""}</LabelText>
                    </LabelBox>
                    <LabelBox>
                      <Label>Realizada em:</Label>
                      <LabelText>{new Date(proofData.Date).toLocaleString()}</LabelText>
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
                      <LabelText>{proofData.From ? proofData.From.From : ""}</LabelText>
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
                      <LabelText>{proofData.To ? proofData.To.ToName : ""}</LabelText>
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

export { Extract };
