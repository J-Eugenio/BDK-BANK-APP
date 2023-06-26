import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiBase as api } from "./Apibase";

async function getToken() {
  return await AsyncStorage.getItem("@bdkbank:token");
}

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
  Nome: string,
  TipoPessoa: string,
  Documento: string,
  Banco: string,
  Agencia: string,
  Conta: string,
  Valor: number,
  Password: string
} 
// Post request
const CreateKeyPix = async (data: CreateKeyPixProps) => {
  const response = await api.post(`/transfer/CreateKeyPix`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const ConsultKeyPix = async (data: ConsultKeyPixProps) => {
  const response = await api.post(`/transfer/ConsultKeyPix`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const SendPix = async (data: SendPixProps) => {
  const response = await api.post(`/transfer/SendPix`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const SendTed = async (data: ISendTed) => {
  const response = await api.post(`/transfer/SendTed`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
}

const ProofById = async (data: ProofByIDDto) => {
  const response = await api.post(`/transfer/proof`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
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
  const response = await api.post(`/transfer/CreateQrCode`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const PayBoleto = async (data: payBoletoDTO) => {
  const response = await api.post(`/transfer/PayBoleto`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const ReadCodigoDeBarra = async (data: string) => {
  const response = await api.post(`/transfer/ReadCodigoDeBarra`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};


// Delete request

const ExcludePix = async (data: string) => {
  const response = await api.post(
    `/transfer/ExcludePix`,
    JSON.stringify(data),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// Get request

const ListKeyPix = async () => {
  const response = await api.get(`/transfer/ListKeyPix`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const ClienteSaldo = async () => {
  const response = await api.get(`/transfer/ClientSaldo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const ListContact = async () => {
  const response = await api.get(`/transfer/ListContact`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const Extract = async (initialDate: string, lastDate: string) => {
  const response = await api.get(
    `/transfer/Extract?dInicial=${initialDate}&dFinal=${lastDate}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
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
  ReadQrCode,
  CreateQrCode,
  SendTed
};
