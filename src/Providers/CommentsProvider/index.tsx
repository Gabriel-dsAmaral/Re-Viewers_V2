import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useUser } from "../UserProvider";
import { api } from "../../services/api";

interface Comment {
  animeId: number;
  comment: string;
  userId: number;
  id: number;
}

interface CommentProviderProps {
  children: ReactNode;
}

interface CommentsContextData {
  comments: Comment[];
  MakeComment: (credentials: MakeCommentCredentials) => Promise<void>;
  DeleteComment: (credentials: DeleteCommentCredentials) => Promise<void>;
  LoadComments: (credentials: LoadCommentsCredentials) => Promise<void>;
  EditComment: (credentials: EditCommentCredentials) => Promise<void>;
}

interface MakeCommentCredentials {
  animeId: number;
  comment: string;
}

interface DeleteCommentCredentials {
  CommentId: number;
}

interface LoadCommentsCredentials {
  animeId: number;
}

interface EditCommentCredentials {
  comment: string;
  CommentId: number;
}

const CommentsContext = createContext<CommentsContextData>(
  {} as CommentsContextData
);

const useComment = () => useContext(CommentsContext);

const CommentProvider = ({ children }: CommentProviderProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { accessToken, user } = useUser();

  const MakeComment = useCallback(
    async ({ animeId, comment }: MakeCommentCredentials) => {
      const userId = user.id;
      await api
        .post(
          "/comments",
          { animeId, comment, userId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .catch((err) => console.log(err));
    },
    []
  );

  const DeleteComment = useCallback(
    async ({ CommentId }: DeleteCommentCredentials) => {
      await api
        .delete(`/comments/${CommentId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const LoadComments = useCallback(
    async ({ animeId }: LoadCommentsCredentials) => {
      await api
        .get(`/comments?animeId=${animeId}`)
        .then((response) => setComments(response.data));
    },
    []
  );

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
