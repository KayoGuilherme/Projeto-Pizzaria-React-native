import React, { useState, createContext, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../config/axios";
import { useNavigation } from "@react-navigation/native";


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  loading: boolean
  signOut: () => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

  const navigation = useNavigation()

  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user.token;

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem("@pizzaria");
      let hasUser: UserProps = JSON.parse(userInfo || `{}`)

      if(Object.keys(hasUser).length > 0){
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
      }

      setUser({
        id: hasUser.id,
        token: hasUser.token,
        name: hasUser.name,
        email: hasUser.email
      })

      setLoading(false)
    }

    getUser()
  }, [])


  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("users", {
        name,
        email,
        password,
      });
      navigation.goBack()
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@pizzaria", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);
    } catch (err) {
      console.log("erro ao acessar", err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
      await AsyncStorage.clear()
      .then(() => {
        setUser({
          id: "",
          name: "",
          email: "",
          token: "",
        })
      })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
