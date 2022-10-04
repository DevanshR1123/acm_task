import { createContext, useState, useEffect, Component } from "react";

interface AuthData {
  [wilcard: string]: any;
}
interface Props {
  children: JSX.Element[];
}

interface response {
  target: EventTarget & {
    username: { value: string };
    password: { value: string };
  };
}

const AuthContext = createContext<AuthData>({});

export default AuthContext;

export const AuthProvider = ({ children }: Props) => {
  const [AuthTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  const LoginUser = async (e: Event & response) => {
    e.preventDefault();

    const url = "http://127.0.0.1:8000/api/token/";

    const username = e.target.username.value;
    const password = e.target.password.value;

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    let data = await response.json();

    if (response.ok) {
    }
  };

  let data: AuthData = { user, LoginUser, isAuthenticated: true };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
