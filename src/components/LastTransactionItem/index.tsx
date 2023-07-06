import React from 'react'
import Icon from "react-native-vector-icons/Feather";
import {
  Container,
  IconContainer,
  Client,
  PaymentDate,
  PaymentValue,
  Box,
  BoxRow,
  ActionClick,
  TypeOfTransaction,
} from "./styles";
import { useEffect, useState } from "react";
import { ScreenProp } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { formatMoney } from "../../utils/format-money";

enum typeOfTransactions {
  CREDITO = "Recebido",
  DEBITO = "Transação",
}

interface TransacationCardProps {
  type: "CREDITO" | "DEBITO";
  cliente: string;
  amount: number;
  id: string;
  date: string;
  isProofAvaliable: boolean;
  indentifyName: string;
}
function LastTransactionItem({
  cliente,
  type,
  amount,
  date,
  id,
  isProofAvaliable,
  indentifyName,
}: TransacationCardProps) {
  const navigation = useNavigation<ScreenProp>();
  return (
    <Container>
      <ActionClick>
        <BoxRow>
          <IconContainer>
            <Icon name="file" color="#5266CE" size={35} />
          </IconContainer>
          <Box>
            <Client>{cliente}</Client>
            <Box>
              {indentifyName ? (
                <TypeOfTransaction
                  color={
                    indentifyName.includes("Crédito") ? "#6EA965" : "#E39E5F"
                  }
                >
                  ({indentifyName})
                </TypeOfTransaction>
              ) : (
                ""
              )}
              <PaymentDate>{new Date(date).toLocaleString()}</PaymentDate>
            </Box>
          </Box>
        </BoxRow>
        <PaymentValue
          color={
            typeOfTransactions[type] == typeOfTransactions.DEBITO
              ? "#E74343"
              : "#6EA965"
          }
        >
          {typeOfTransactions[type] == typeOfTransactions.DEBITO ? "-" : ""}
          {formatMoney.format(amount)}
        </PaymentValue>
      </ActionClick>
    </Container>
  );
}

export { LastTransactionItem };
