import { createContext, useState, useEffect, Component } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
  let tokens = localStorage.getItem("AuthTokens");
  const [AuthTokens, setAuthTokens] = useState(() =>
    tokens ? JSON.parse(tokens) : null
  );

  const [user, setUser] = useState(() => (tokens ? jwt_decode(tokens) : null));

  const [Loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
      setAuthTokens(data);
      setUser(jwt_decode(data.access));

      localStorage.setItem("AuthTokens", JSON.stringify(data));

      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const LogoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("AuthTokens");
    navigate("/login");
  };

  const UpdateTokens = async () => {
    const url = "http://127.0.0.1:8000/api/token/refresh/";

    let refresh = AuthTokens?.refresh;

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    let data = await response.json();

    if (response.ok) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("AuthTokens", JSON.stringify(data));
    } else {
      LogoutUser();
    }
    if (Loading) setLoading(false);
  };

  useEffect(() => {
    const duration = 1000 * 60 * 4;
    if (Loading) UpdateTokens();

    let interval = setInterval(() => {
      if (AuthTokens) {
        UpdateTokens();
      }
    }, duration);

    return () => clearInterval(interval);
  }, [AuthTokens, Loading]);

  let data: AuthData = { user, AuthTokens, LoginUser, LogoutUser };

  return (
    <AuthContext.Provider value={data}>
      {!Loading ? children : null}
    </AuthContext.Provider>
  );
};
