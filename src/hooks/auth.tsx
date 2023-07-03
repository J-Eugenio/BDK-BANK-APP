import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiBase as api } from "../service/Apibase";
import { ScreenProp } from "../../App";
import { showToast } from "../utils/toast";

interface AuthState {
  token: string;
  user: object;
}

interface signInCredentials {
  document: string;
  password: string;
}
interface UserImageProps {
  id: string;
  user_id: string;
  image: string;
}
interface UserProps {
  id?: string;
  name?: string;
  role?: string;
  email?: string;
  cpf?: string;
  userImage?: UserImageProps;
}
interface AuthContextState {
  user: UserProps;
  signIn(credentials: signInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
  token: string;
  auth: any;
  setAuth(object: any): any;
  setData({ token, user }: AuthState): any;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ScreenProp>();
  const [auth, setAuth] = useState({});

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@bdkbank:token",
        "@bdkbank:user",
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(
    async ({ document, password }: signInCredentials) => {
      try {
        const response = await api.post(
          "/client/Login",
          {
            document,
            password,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (response.data.Message === "Senha incorreta") {
          showToast(
            `${response.data.Message} tentativas restantes: ${response.data.Object.Tentativas}`
          );
        } else if (
          response.data.Sucess &&
          response.data.Object.Tentativas === 0
        ) {
          const limitTryMessage = response.data.Message.split("em");
          showToast(
            `${
              limitTryMessage[0] +
              "em " +
              new Date(limitTryMessage[1].slice(0, 17)).toLocaleString()
            }`
          );
        } else {
          if (response.data.Sucess === false) {
            showToast(response.data.Message);

            return;
          } else {
            showToast("Token de acesso enviado");

            navigation.navigate("VerifyAccount", {
              ChaveLogin: response.data.Object.ChaveLogin,
            });

            if (response.data.Object) {
              setAuth(response.data.Object);
            }
          }
        }
      } catch (error) {}
    },
    []
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@bdkbank:user", "@bdkbank:token"]);
    navigation.navigate("Login");
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        loading,
        token: data.token,
        auth,
        setAuth,
        setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
