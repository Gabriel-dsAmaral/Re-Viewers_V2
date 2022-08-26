import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

import { api2 } from "../../services/api";
import { useUser } from "../UserProvider";

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

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface Comment {
  comment_id: string;
  comment: string;
  user: User;
  anime: AnimesData;
  userId: number;
  id: number;
  name: string;
  userImg: string;
}

interface CommentProviderProps {
  children: ReactNode;
}

interface CommentsContextData {
  comments: Comment[];
  postComment: (animeId: string, comment: string) => Promise<void>;
  delComment: (credentials: string) => Promise<void>;
  getComments: (credentials: string) => Promise<void>;
  patchComment: (credentials: EditCommentCredentials) => Promise<void>;
}

interface EditCommentCredentials {
  comment: string;
  CommentId: string;
}

const CommentsContext = createContext<CommentsContextData>(
  {} as CommentsContextData
);

const useComment = () => useContext(CommentsContext);

const CommentProvider = ({ children }: CommentProviderProps) => {
  const { accessToken } = useUser();

  const [comments, setComments] = useState<Comment[]>([]);

  const postComment = useCallback(async (animeId: string, comment: string) => {
    await api2
      .post(
        "/api/comments/",
        {
          anime_id: animeId,
          comment,
        },
        {
          headers: { Authorization: `Token ${accessToken}` },
        }
      )
      .catch((err) => console.log("postComment", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComments = useCallback(async (animeId: string) => {
    setComments([]);
    await api2
      .get(`/api/comments/anime/${animeId}/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {});
  }, []);

  const delComment = useCallback(async (CommentId: string) => {
    await api2
      .delete(`/api/comments/${CommentId}/`, {
        headers: { Authorization: `Token ${accessToken}` },
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patchComment = useCallback(
    async ({ comment, CommentId }: EditCommentCredentials) => {
      await api2.patch(
        `/api/comments/${CommentId}/`,
        { comment },
        {
          headers: { Authorization: `Token ${accessToken}` },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <CommentsContext.Provider
      value={{
        postComment,
        delComment,
        getComments,
        comments,
        patchComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentProvider, useComment };
