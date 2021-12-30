import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as AuthSession from "expo-auth-session"
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextProps{
  user: UserProps;
  userStorageLoading: Boolean,
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthorizationResponseProps {
  params: {
    access_token: string;
  },
  type: string
}

const userStorageKey = "@gofinance:user"

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({children}: AuthProviderProps){
  const [user,setUser] = useState<UserProps>({} as UserProps);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle(){
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {type, params} = await AuthSession
      .startAsync({authUrl: AUTH_URL}) as AuthorizationResponseProps;

      if(type === "success"){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          avatar: userInfo.picture,
        }

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signInWithApple(){
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes:[
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if(credential){
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=2`
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        }

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async function signOut(){
    setUser({} as UserProps)
    await AsyncStorage.removeItem(userStorageKey)
  }

  async function loadUserStorageData(){
    const userStoraged = await AsyncStorage.getItem(userStorageKey);

    if(userStoraged){
      const userLogged = JSON.parse(userStoraged) as UserProps;
      setUser(userLogged)
    }
    setUserStorageLoading(false)
  }

  useEffect(() => {
     loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      userStorageLoading,
      signInWithGoogle,
      signInWithApple,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
};