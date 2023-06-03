import { ApiBase as api } from "./Apibase";

let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("@bdkbank:token");
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

// Post request
const CreateKeyPix = async (data: CreateKeyPixProps) => {
  const response = await api.post(`/transfer/CreateKeyPix`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const ConsultKeyPix = async (data: ConsultKeyPixProps) => {
  const response = await api.post(`/transfer/ConsultKeyPix`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const SendPix = async (data: SendPixProps) => {
  const response = await api.post(`/transfer/SendPix`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Delete request

// const ExcludePix = async (data: number) => {
//   const response = await api.delete(`/transfer/ExcludePix`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response;
// };

// Get request

const ListKeyPix = async () => {
  const response = await api.get(`/transfer/ListKeyPix`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const ClienteSaldo = async () => {
  const response = await api.get(`/transfer/ClientSaldo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const ListContact = async () => {
  const response = await api.get(`/transfer/ListContact`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const Extract = async (initialDate: string, lastDate: string) => {
  const response = await api.get(
    `/transfer/Extract?dInicial=${initialDate}&dFinal=${lastDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
};
