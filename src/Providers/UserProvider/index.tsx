import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

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
  watchingList: IUserListStatus[];
  watchLaterList: IUserListStatus[];
  finishedList: IUserListStatus[];
  signOut: () => void;
  signIn: (credentials: SighInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  EditUser: (credentials: EditUserCredentials) => Promise<void>;
  ChangeAvatar: (credentials: ChangeAvatarCredentials) => Promise<void>;
  getUserList: () => void;
  addUserList: (status: string, id: string, statusFound: any) => Promise<void>;
  updateUserList: (
    status: string,
    statusFound: IUserListStatus
  ) => Promise<void>;
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
  average_rate: Number;
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

interface IUserListStatus {
  id: string;
  watching_status: string;
  anime: AnimesData;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: UserProviderProps) => {
  // const [watchingList, setWatchingList] = useState<IUserListStatus[]>([]);
  // const [watchLaterList, setWatchLaterList] = useState<IUserListStatus[]>([]);
  // const [finishedList, setFinishedList] = useState<IUserListStatus[]>([]);

  const navigate = useNavigate();

  const [data, setData] = useState<UserState>(() => {
    const token = localStorage.getItem("@re:viewers:acessToken");
    const user = localStorage.getItem("@re:viewers:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as UserState;
  });

  const signIn = async ({ email, password }: SighInCredentials) => {
    let response = await api2.post("/api/users/login/", { email, password });

    const { token } = response.data;

    await api2
      .get("/api/users/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        const user = response.data;

        localStorage.setItem("@re:viewers:acessToken", token);
        localStorage.setItem("@re:viewers:user", JSON.stringify(user));

        setData({ token, user });
      });
  };

  const signOut = useCallback(() => {
    localStorage.clear();

    setData({} as UserState);
    navigate("/");
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

  let watchingList: IUserListStatus[] = [];
  let watchLaterList: IUserListStatus[] = [];
  let finishedList: IUserListStatus[] = [];

  const getUserList = async () => {
    watchingList.length = 0;
    watchLaterList.length = 0;
    finishedList.length = 0;

    await api2
      .get("/api/userlist/", {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      })
      .then((response) => {
        if (!response.data.results) return "";

        // if (response.data.count > 3) {
        //   console.log("tem muito anime");

        //   // while (response.data.next !== null) {
        //   nextPage();
        //   // }
        // } else {
        response.data.results.forEach((e: IUserListStatus) => {
          if (e.watching_status === "Assistindo") {
            watchingList.push(e);
          }
          if (e.watching_status === "Assistir mais tarde") {
            watchLaterList.push(e);
          }
          if (e.watching_status === "Terminado") {
            finishedList.push(e);
          }
        });

        console.log("response.data.results", response.data);
        // }
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log("chamou a fç getUserlist");

    console.log("watchingList", watchingList);
    console.log("watchLaterList", watchLaterList);
    console.log("finishedList", finishedList);
  };

  const nextPage = async () => {
    let page = 2;
    await api2
      .get(`/api/userlist/?page=${page}`, {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      })
      .then((res) => {
        res.data.results.forEach((e: IUserListStatus) => {
          if (e.watching_status === "Assistindo") {
            watchingList.push(e);
          }
          if (e.watching_status === "Assistir mais tarde") {
            watchLaterList.push(e);
          }
          if (e.watching_status === "Terminado") {
            finishedList.push(e);
          }

          console.log("watchingList", watchingList);
          console.log("watchLaterList", watchLaterList);
          console.log("finishedList", finishedList);
        });

        page += 1;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUserList = async (
    status: string,
    id: string,
    statusFound: IUserListStatus[]
  ) => {
    console.log(statusFound);

    if (statusFound.length > 0) {
      updateUserList(status, statusFound[0]);
    } else {
      await api2
        .post(
          `/api/userlist/${id}/`,
          {
            watching_status: status,
          },
          {
            headers: {
              Authorization: `Token ${data.token}`,
            },
          }
        )
        .then(() => {
          getUserList();
        });
    }
  };

  const updateUserList = async (status: string, { id }: IUserListStatus) => {
    await api2
      .patch(
        `/api/userlist/myanimes/${id}/`,
        {
          watching_status: status,
        },
        {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        }
      )
      .then(() => {
        getUserList();
      });
  };

  const EditUser = useCallback(
    async ({ name }: EditUserCredentials) => {
      // const response =
      await api2
        .patch(
          `/api/users/profile/`,
          {
            first_name: name,
          },
          {
            headers: { Authorization: `Token ${data.token}` },
          }
        )
        .then((res) =>
          localStorage.setItem("@re:viewers:user", JSON.stringify(res.data))
        )
        .catch((err) => {
          console.log("edit user", err);
        });

      // await api
      //   .patch(
      //     `/users/${userId}`,
      //     { name },
      //     {
      //       headers: { Authorization: `Bearer ${accessToken}` },
      //     }
      //   )
      //   .then(
      //     response.data.forEach((item: CommentInfo) => {
      //       api.patch(
      //         `/comments/${item.id}`,
      //         { name: name },
      //         {
      //           headers: { Authorization: `Bearer ${accessToken}` },
      //         }
      //       );
      //     })
      //   )

      //   );
      // window.location.reload();
    },
    [data]
  );

  const ChangeAvatar = useCallback(
    async ({ avatar }: ChangeAvatarCredentials) => {
      console.log("avatar", avatar);
      await api2
        .patch(
          `/api/users/profile/`,
          {
            avatar,
          },
          {
            headers: { Authorization: `Token ${data.token}` },
          }
        )
        .then((res) =>
          localStorage.setItem("@re:viewers:user", JSON.stringify(res.data))
        )
        .catch((err) => {
          console.log("avatar", err);
        });

      // const response = await api.get(`/users/${userId}/comments`, {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // });

      // await api
      //   .patch(
      //     `/users/${userId}`,
      //     { userImg: userImg },
      //     {
      //       headers: { Authorization: `Bearer ${accessToken}` },
      //     }
      //   )
      //   .then(
      //     response.data.forEach((item: CommentInfo) => {
      //       api.patch(
      //         `/comments/${item.id}`,
      //         { userImg: userImg },
      //         {
      //           headers: { Authorization: `Bearer ${accessToken}` },
      //         }
      //       );
      //     })
      //   )
      //   .then((res) =>
      //     localStorage.setItem("@re:viewers:user", JSON.stringify(res.data))
      //   );
      // window.location.reload();
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
        updateUserList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
