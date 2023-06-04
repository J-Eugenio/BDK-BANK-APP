import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiBase as api} from '../service/Apibase';
import { ScreenProp } from '../../App';

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
  role?: string
  email?: string;
  cpf?: string;
  userImage?: UserImageProps
}
interface AuthContextState {
    user: UserProps;
    signIn(credentials: signInCredentials): Promise<void>;
    signOut(): void;
    loading: boolean;
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ScreenProp>(); 

  useEffect(() => {
    async function loadStorageData():Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@bdkbank:token',
        '@bdkbank:user',
      ]);
      
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ document, password }: signInCredentials) => {
    const response = await api.post("/client/Login", {
      document,
      password,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

  
    if(response.data.Sucess){
      console.log(response.data);
      navigation.navigate("VerifyAccount", {
        ChaveLogin: response.data.Object.ChaveLogin,
      })
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@bdkbank:user',
      '@bdkbank:token',
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{
      user: data.user, signIn, signOut, loading, token: data.token
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}