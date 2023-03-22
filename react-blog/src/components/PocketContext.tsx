import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PocketBase, { Admin, RecordAuthResponse } from "pocketbase";
import jwtDecode from "jwt-decode";
import { useInterval } from "usehooks-ts";
import { User } from "../db/types";

interface JwtToken {
  name: string;
  exp: number;
}

interface PocketContextProps {
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<User | undefined> | Promise<undefined>;
  login: (
    email: string,
    password: string
  ) => Promise<RecordAuthResponse<User>> | Promise<undefined>;
  logout: () => void;
  user: PbUser | null;
  token: string;
  pb: PocketBase;
}

type Props = {
  children: ReactNode;
};

type PbUser = Record<string, User> | Admin | null;

const BASE_URL = "http://127.0.0.1:8090";
const PocketContext = createContext<PocketContextProps>({
  register: async () => {
    return undefined;
  },
  login: async () => {
    return undefined;
  },
  logout: () => {},
  user: null,
  token: "",
  pb: new PocketBase(BASE_URL),
});

export const PocketProvider = ({ children }: Props) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);
  const [token, setToken] = useState<string>(pb.authStore.token || "");
  const [user, setUser] = useState<PbUser>(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token: string, model: PbUser) => {
      setToken(token);
      setUser(model);
    });
  }, [pb.authStore]);

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      try {
        var result = await pb
          .collection("users")
          .create<User>({
            username,
            email,
            password,
            passwordConfirm: password,
          });
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
      return undefined;
    },
    [pb]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      return await pb
        .collection("users")
        .authWithPassword<User>(email, password);
    },
    [pb]
  );

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, [pb]);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded = jwtDecode(token) as JwtToken;
    const tokenExpiration = decoded.exp;
    const expirationWithBuffer = (decoded.exp + 300000) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [pb, token]);

  useInterval(refreshSession, token ? 120000 : null);

  const contextValue: PocketContextProps = {
    register,
    login,
    logout,
    user,
    token,
    pb,
  };

  return (
    <PocketContext.Provider value={contextValue}>
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
