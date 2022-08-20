import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

import { api, api2 } from "../../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface SighInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface EditUserCredentials {
  name: string;
}

interface ChangeAvatarCredentials {
  avatar: string;
}

interface CommentInfo {
  animeId: number;
  comment: string;
  id: number;
  name: string;
  userId: number;
  avatar: string;
}

interface UserContextData {
  user: User;
  accessToken: string;
  signOut: () => void;
  signIn: (credentials: SighInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  EditUser: (credentials: EditUserCredentials) => Promise<void>;
  ChangeAvatar: (credentials: ChangeAvatarCredentials) => Promise<void>;
  getUserList: () => void;
}

interface UserState {
  token: string;
  user: User;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: UserProviderProps) => {
  const [data, setData] = useState<UserState>(() => {
    const token = localStorage.getItem("@re:viewers:acessToken");
    const user = localStorage.getItem("@re:viewers:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as UserState;
  });

  const signIn = useCallback(async ({ email, password }: SighInCredentials) => {
    let response = await api2.post("/api/users/login/", { email, password });

    const { token } = response.data;

    response = await api2.get("/api/users/profile/", {
      headers: { Authorization: `Token ${token}` },
    });

    const user = response.data;

    localStorage.setItem("@re:viewers:acessToken", token);
    localStorage.setItem("@re:viewers:user", user);

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();

    setData({} as UserState);
  }, []);

  const signUp = useCallback(
    async ({
      first_name,
      last_name,
      email,
      password,
      avatar,
    }: SignUpCredentials) => {
      await api2.post("/api/users/register/", {
        first_name,
        last_name,
        email,
        password,
        avatar,
      });
    },
    []
  );

  const getUserList = async () => {
    const response = await api2.get("/api/userlist/", {
      headers: {
        Authorization: `Token ${localStorage.getItem(
          "@re:viewers:acessToken"
        )}`,
      },
    });

    console.log(response.data);
  };

  const EditUser = useCallback(
    async ({ name }: EditUserCredentials) => {
      const userId = data.user.id;
      const accessToken = data.accessToken;
      const response = await api.get(`/users/${userId}/comments`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await api
        .patch(
          `/users/${userId}`,
          { name },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then(
          response.data.forEach((item: CommentInfo) => {
            api.patch(
              `/comments/${item.id}`,
              { name: name },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
          })
        )
        .then((res) =>
          localStorage.setItem("@re:viewers:user", JSON.stringify(res.data))
        );
      window.location.reload();
    },
    [data]
  );

  const ChangeAvatar = useCallback(
    async ({ userImg }: ChangeAvatarCredentials) => {
      const userId = data.user.id;
      const accessToken = data.accessToken;
      const response = await api.get(`/users/${userId}/comments`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await api
        .patch(
          `/users/${userId}`,
          { userImg: userImg },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then(
          response.data.forEach((item: CommentInfo) => {
            api.patch(
              `/comments/${item.id}`,
              { userImg: userImg },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
          })
        )
        .then((res) =>
          localStorage.setItem("@re:viewers:user", JSON.stringify(res.data))
        );
      window.location.reload();
    },
    [data]
  );

  return (
    <UserContext.Provider
      value={{
        accessToken: data.token,
        user: data.user,
        signUp,
        signIn,
        signOut,
        EditUser,
        ChangeAvatar,
        getUserList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
