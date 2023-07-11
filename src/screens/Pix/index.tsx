import React, { useState } from "react";
import { Header } from "../../components/Header";
import {
  Container,
  Title,
  Main,
  MainActionContainer,
  Flex,
  Box,
  BtnDateOpen,
  LabelBox,
  Label,
  AmountValue,
  BoxToItemPerList,
  ModalSuccess,
  ModalContainer,
  TitleBox,
  DownloadButton,
  ModalBox,
  FlexModal,
  TextMessage,
  LabelText,
  DividerModal,
  SecondaryTitleModal,
  LabelStrong,
  BoxToOpenModal,
} from "./styles";
import { MainActionBtn } from "../../components/MainActionBtn";
import { DateInput } from "../../components/DateInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { LastTransactionItem } from "../../components/LastTransactionItem";
import { createAndSavePDF } from "../../utils/downloadBilletPds";
import { ActivityIndicator } from "react-native";
import { Button } from "../../components/Button";
import DownloadPDF from "../../components/DownloadPDF";
import { Logo } from "../Extract/styles";
import Bdk from "../../assets/logo.png";
import { formatMoney } from "../../utils/format-money";
import {
  Extract as ExtractListCall,
  ProofById,
} from "../../service/ApiPaymentsRoutes";

function Pix() {
  const [showDateInit, setShowDateInit] = useState(false);
  const [showDateIEnd, setShowDateEnd] = useState(false);
  const [dateFilterInit, setDateFilterInit] = useState(new Date());
  const [dateFilterEnd, setDateFilterEnd] = useState(new Date());
  const [proofData, setProofData] = useState({} as any);
  const [proofMessage, setProofMessage] = useState("");
  const [proofExists, setProofExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
  const [extractPixList, setExtractPixList] = useState<Array<any>>([]);

  const callDownloadBillet = async () => {
    await createAndSavePDF();
  };

  const ExtractLists = async (iDate: string, lDate: string) => {
    setLoading(true);
    await ExtractListCall(iDate, lDate)
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

        setExtractPixList(debts.slice(0, 10));
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    ExtractLists(initialDate, lastDate);
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
        <Title>Ações</Title>
        <MainActionContainer>
          <MainActionBtn
            title="Tranferir"
            iconName="repeat"
            page="TransferPix"
          />
          <MainActionBtn title="Cobrar" iconName="maximize" page="DemandPix" />
          <MainActionBtn
            title="Copia e Cola"
            iconName="copy"
            page="CopyAndPastePix"
          />
          <MainActionBtn title="Chaves" iconName="key" page="KeysPix" />
        </MainActionContainer>

        <Title>Últimos Pix</Title>
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
        </Flex>
        {showDateInit ? (
          <DateInput
            value={dateFilterInit}
            setValue={setDateFilterInit}
            closeModal={setShowDateInit}
          />
        ) : (
          <></>
        )}
        {showDateIEnd ? (
          <DateInput
            value={dateFilterEnd}
            setValue={setDateFilterEnd}
            closeModal={setShowDateEnd}
          />
        ) : (
          <></>
        )}
        {loading === true ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {extractPixList &&
              extractPixList.map((item) => {
                return (
                  <BoxToOpenModal
                    key={item.id}
                    onPress={() => {
                      listProofById(item.Identifier, item.nomeidentificacao);
                    }}
                  >
                    <LastTransactionItem
                      cliente={item.Pessoa ? item.Pessoa : "Não informado"}
                      type={item.movimento}
                      indentifyName={item.nomeidentificacao}
                      amount={item.valor}
                      date={item.dateAt}
                      id={item.Identifier}
                      isProofAvaliable={item.Comprovant}
                    />
                  </BoxToOpenModal>
                );
              })}
          </>
        )}
      </Main>
      <ModalSuccess
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          <TitleBox>
            <Logo source={Bdk} resizeMode="contain" />
            {loadingData === true ? "" : <DownloadPDF data={proofData} />}
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

export { Pix };
