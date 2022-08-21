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

type UserList = {
  status: string;
  id: string;
};

interface UserContextData {
  user: User;
  accessToken: string;
  watchingList: AnimesData[];
  watchLaterList: AnimesData[];
  finishedList: AnimesData[];
  signOut: () => void;
  signIn: (credentials: SighInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  EditUser: (credentials: EditUserCredentials) => Promise<void>;
  ChangeAvatar: (credentials: ChangeAvatarCredentials) => Promise<void>;
  getUserList: () => void;
  addUserList: (status: string, id: string) => Promise<void>;
}

interface UserState {
  token: string;
  user: User;
}

interface IUserList {
  [key: string]: string;
}

interface AnimesData {
  myListStatus?: string;
  id: string;
  title: string;
  categories: Array<object>;
  // rate?: Array<Rate>;
  banner: string;
  image: string;
  original_title: string;
  status: string;
  launch_data: string;
  studio: string;
  sinopse: string;
  userId?: number;
  data?: object;
}

type IUserListStatus = {
  watching_status: string;
  anime: AnimesData;
};

const UserContext = createContext<UserContextData>({} as UserContextData);

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: UserProviderProps) => {
  // const [watching, setWatching ] = useState<IUserList | AnimesData[]>({"status": "Nenhum Anime adicionado ainda"})
  // const [watchLater, setWatchLater ] = useState<IUserList | AnimesData[]>({"status": "Nenhum Anime adicionado ainda"})
  // const [finished, setFinished ] = useState<IUserList | AnimesData[]>({"status": "Nenhum Anime adicionado ainda"})

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

  let watchingList: AnimesData[] = [];
  let watchLaterList: AnimesData[] = [];
  let finishedList: AnimesData[] = [];

  const getUserList = async () => {
    watchingList.length = 0;
    watchLaterList.length = 0;
    finishedList.length = 0;

    const response = await api2.get("/api/userlist/", {
      headers: {
        Authorization: `Token ${localStorage.getItem(
          "@re:viewers:acessToken"
        )}`,
      },
    });

    if (!response.data.results) return "";

    response.data.results.forEach((e: IUserListStatus) => {
      if (e.watching_status === "Assistindo") {
        // if (!watchingList.find((anime) => e.anime["id"] === anime["id"]))
        watchingList.push(e.anime);
      }
      if (e.watching_status === "Assistir mais tarde") {
        // if (!watchLaterList.find((anime) => e.anime["id"] === anime["id"]))
        watchLaterList.push(e.anime);
      }
      if (e.watching_status === "Finalizado") {
        // if (!finishedList.find((anime) => e.anime["id"] === anime["id"]))
        finishedList.push(e.anime);
      }
    });

    console.log(response.data);
  };

  const addUserList = async (status: string, id: string) => {
    await api2.post(
      `/api/userlist/${id}/`,
      {
        watching_status: status,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem(
            "@re:viewers:acessToken"
          )}`,
        },
      }
    );
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
        watchingList,
        watchLaterList,
        finishedList,
        signUp,
        signIn,
        signOut,
        EditUser,
        ChangeAvatar,
        getUserList,
        addUserList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
