import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiBase as api } from "./Apibase";

interface CreateKeyPixProps {
  Key: string;
  Type: number;
}

interface ConsultKeyPixProps {
  KeyPix: string;
  TypeKey: number;
}

interface SendPixProps {
  ToKeyPix: string;
  TypeKeyPix: number;
  Name: string;
  Value: number;
  SaveContact: boolean;
  Message: string;
  Password: string;
  Bank: string;
}

interface ProofByIDDto {
  ComprovanteId: string;
  TipoMovimentacao: string;
}

interface createQRcodeDTO {
  KeyPixSelected: string | null;
  descricao: string;
  valor: number;
}

interface payBoletoDTO {
  Valor: number;
  dateVencimento: string;
  CodigoDeBarras: string;
  Password: string;
}

interface ISendTed {
  Nome: string;
  TipoPessoa: string;
  Documento: string;
  Banco: string;
  Agencia: string;
  Conta: string;
  Valor: number;
  Password: string;
}
// Post request
const CreateKeyPix = async (data: CreateKeyPixProps) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/CreateKeyPix`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const ConsultKeyPix = async (data: ConsultKeyPixProps) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/ConsultKeyPix`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const SendPix = async (data: SendPixProps) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/SendPix`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const SendTed = async (data: ISendTed) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/SendTed`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const ProofById = async (data: ProofByIDDto) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/proof`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const ReadQrCode = async (codigo: string, token: string) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = await api.post(
    `/transfer/ReadQrCode?CodigoQrCode=${codigo}`,
    {},
    config
  );
  return response;
};

const CreateQrCode = async (data: createQRcodeDTO) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/CreateQrCode`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const PayBoleto = async (data: payBoletoDTO) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/PayBoleto`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const ReadCodigoDeBarra = async (data: string) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(`/transfer/ReadCodigoDeBarra`, data, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

// Delete request

const ExcludePix = async (data: string) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.post(
    `/transfer/ExcludePix`,
    JSON.stringify(data),
    {
      headers: {
        Authorization: `Bearer ${userFormatted.Token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// Get request

const ListKeyPix = async () => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.get(`/transfer/ListKeyPix`, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const ClienteSaldo = async () => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.get(`/transfer/ClientSaldo`, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const ListContact = async () => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.get(`/transfer/ListContact`, {
    headers: {
      Authorization: `Bearer ${userFormatted.Token}`,
    },
  });
  return response;
};

const Extract = async (initialDate: string, lastDate: string) => {
  const user = await AsyncStorage.getItem("@bdkbank:user");
  // @ts-ignore
  const userFormatted = JSON.parse(user);
  const response = await api.get(
    `/transfer/Extract?dInicial=${initialDate}&dFinal=${lastDate}`,
    {
      headers: {
        Authorization: `Bearer ${userFormatted.Token}`,
      },
    }
  );
  return response;
};

export {
  CreateKeyPix,
  ConsultKeyPix,
  SendPix,
  ClienteSaldo,
  ListContact,
  ListKeyPix,
  Extract,
  ExcludePix,
  ProofById,
  PayBoleto,
  ReadCodigoDeBarra,
  ReadQrCode,
  CreateQrCode,
  SendTed,
};
