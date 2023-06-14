import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiBase as api } from "./Apibase";

interface ClientProps {
  fullName: string;
  accountType: string;
  email: string;
  ddd: string;
  phone: string;
  device: string;
  gender: string;
  placeOfBirth: string;
  monthlyIncome: number;
  maritalStatus: string;
  add_Address: string;
  add_Neighborhood: string;
  add_StreetNumber: string;
  add_ZipCode: string;
  add_Complement: string;
  add_City: string;
  add_Province: string;
  rg: string;
  documentId: string;
  birthDate: string;
  motherName: string;
  isPoliticallyExposed: string;
  hashpass: string;
  passwordInitial: string;
  base64Self: string;
  base64DocFront: string;
  base64DoBack: string;
  base64Proofddress: string;
}

interface ProofByIDDto {
  ComprovanteId: string;
  TipoMovimentacao: string
}

async function getToken() {
  return await AsyncStorage.getItem("@bdkbank:token");
}
const verifyEmail = async (emailText: string) => {
  const response = await api.post(`/client/VerifyEmail`, emailText, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

const verifyPhohe = async (ddd: string, phoneNumber: string) => {
  const phone = `${ddd}${phoneNumber}`;
  const response = await api.post(
    `/client/VerifyPhone`,
    JSON.stringify(phone),
    { headers: { "Content-Type": "application/json" } }
  );
  return response;
};

const saveClient = async (data: ClientProps) => {
  const response = await api.post(`/client/SaveClient`, data);
  return response;
};

const confirmPhone = async (phoneNumber: number) => {
  const response = await api.post(`/client/ConfirmPhone`, Number(phoneNumber), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const confirmEmail = async (email: number) => {
  const response = await api.post(`/client/ConfirmEmail`, Number(email), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const updatePhone = async (phone: string) => {
  const response = await api.put(`/client/UpdatePhone`, phone, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const updateEmail = async (email: string) => {
  const response = await api.put(`/client/UpdateEmail`, email, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const resendPhone = async () => {
  const response = await api.get(`/client/ResendPhone`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const resendEmail = async () => {
  const response = await api.get(`/client/ResendEmail`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

const loginConfirm = async (chaveLogin: string, codigo: string) => {
  const response = await api.post(`/client/LoginConfirm`, {
    chaveLogin,
    codigo,
  });
  return response;
};

const ProofById = async (data: ProofByIDDto) => {
  const response = await api.post(
    `/transfer/proof`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    }
  );
  return response;
};

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

export {
  verifyPhohe,
  verifyEmail,
  saveClient,
  confirmPhone,
  confirmEmail,
  updatePhone,
  updateEmail,
  resendPhone,
  resendEmail,
  loginConfirm,
  ProofById,
  ExcludePix
};
