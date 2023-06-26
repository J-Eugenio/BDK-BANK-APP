import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiBase as api } from "./Apibase";

interface ClientProps {
  FullName: string;
  AccountType: string;
  Email: string;
  DDD: string;
  Phone: string;
  Device: string;
  Gender: string;
  PlaceOfBirth: string;
  MonthlyIncome: number;
  MaritalStatus: string;
  Add_Address: string;
  Add_Neighborhood: string;
  Add_StreetNumber: string;
  Add_ZipCode: string;
  Add_Complement: string;
  Add_City: string;
  Add_Province: string;
  Rg: string;
  DocumentId: string;
  BirthDate: string;
  MotherName: string;
  IsPoliticallyExposed: string;
  Hashpass: string;
  PasswordInitial: string;
  Base64Self: string;
  Base64DocFront: string;
  Base64DoBack: string;
  Base64Proofddress: string;
  occupation: string;
}

interface RecoverPasswordConfirmationDTO {
  Cpf: string;
  Codigo: number;
  Senha: string;
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

const confirmPhone = async (phoneNumber: number, token: string) => {
  const response = await api.post(`/client/ConfirmPhone`, Number(phoneNumber), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const confirmEmail = async (email: number, token: string) => {
  const response = await api.post(`/client/ConfirmEmail`, Number(email), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updatePhone = async (phone: string, token: string) => {
  const response = await api.put(`/client/UpdatePhone`, phone, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateEmail = async (email: string, token: string) => {
  const response = await api.put(`/client/UpdateEmail`, email, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const resendPhone = async (token: string) => {
  const response = await api.get(`/client/ResendPhone`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const resendEmail = async (token: string) => {
  const response = await api.get(`/client/ResendEmail`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

const RecoverPassword = async (data: string) => {
  const response = await api.post(
    `/client/RecoverPassword`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const RecoverPasswordConfirmation = async (
  data: RecoverPasswordConfirmationDTO
) => {
  const response = await api.post(`/client/RecoverPasswordConfirmation`, data);
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
  RecoverPassword,
  RecoverPasswordConfirmation,
};
