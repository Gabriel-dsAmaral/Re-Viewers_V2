import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

import { api } from "../../services/api";
import { useUser } from "../UserProvider";

interface Comment {
  animeId: number;
  comment: string;
  userId: number;
  id: number;
  name: string;
}

interface CommentProviderProps {
  children: ReactNode;
}

interface CommentsContextData {
  comments: Comment[];
  MakeComment: (animeId: number, comment: string) => Promise<void>;
  DeleteComment: (credentials: number) => Promise<void>;
  LoadComments: (credentials: number) => Promise<void>;
  EditComment: (credentials: EditCommentCredentials) => Promise<void>;
}

interface EditCommentCredentials {
  comment: string;
  CommentId: number;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface UserState {
  user: User;
}

const CommentsContext = createContext<CommentsContextData>(
  {} as CommentsContextData
);

const useComment = () => useContext(CommentsContext);

const CommentProvider = ({ children }: CommentProviderProps) => {
  const { accessToken, user } = useUser();

  const [comments, setComments] = useState<Comment[]>([]);

  const MakeComment = useCallback(async (animeId: number, comment: string) => {
    await api
      .post(
        "/comments",
        { animeId, comment, userId: user?.id, name: user?.name },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .catch((err) => console.log(err));
  }, []);

  const LoadComments = useCallback(async (animeId: number) => {
    await api
      .get(`/comments?animeId=${animeId}`)
      .then((response) => setComments(response.data));
  }, []);

  const DeleteComment = useCallback(async (CommentId: number) => {
    await api
      .delete(`/comments/${CommentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((err) => console.log(err));
  }, []);

  const EditComment = useCallback(
    async ({ comment, CommentId }: EditCommentCredentials) => {
      await api.patch(
        `/comments/${CommentId}`,
        { comment },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    },
    []
  );
  return (
    <CommentsContext.Provider
      value={{
        MakeComment,
        DeleteComment,
        LoadComments,
        comments,
        EditComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentProvider, useComment };
