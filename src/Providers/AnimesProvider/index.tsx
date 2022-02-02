import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../../services/api";
import { useUser } from "../UserProvider";

interface Children {
  children: ReactNode;
}
interface AnimesData {
  id: number;
  title: string;
  category: Array<string>;
  rate?: Array<string>;
  banner_url: string;
  image_url: string;
  original: string;
  status: string;
  launch_date: string;
  studio: string;
  synopsis: string;
  userId?: number;
  data?: object;
}
interface AnimeProviderData {
  animes: AnimesData[];
  myList: AnimesData[] | object;
  shounenAnimes: AnimesData[];
  selectedAnime: AnimesData;
  searchList: AnimesData[];
  searched: string;

  setSearchList: (prevState: AnimesData[]) => void;
  getAnimeById: (id: number) => void;
  getAnimes: () => void;
  getMyList: (userId: number) => void;
  deleteMyList: (userId: number) => void;
  addAnimeList: (data: AnimesData) => void;
  searchAnime: (search: string) => void;
  setSearched: (search: string) => void;
}

const AnimeContext = createContext<AnimeProviderData>({} as AnimeProviderData);

const AnimeProvider = ({ children }: Children) => {
  const { user, accessToken } = useUser();

  const [animes, setAnimes] = useState<AnimesData[]>([]);
  const [shounenAnimes, setShounenAnimes] = useState<AnimesData[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimesData>(
    {} as AnimesData
  );
  const [myList, setMyList] = useState<AnimesData[]>([]);
  const [searchList, setSearchList] = useState<AnimesData[]>([]);
  const [searched, setSearched] = useState("");

  const getAnimes = async () => {
    const response = await api.get("/animes");

    const data = response.data;
    setAnimes(data);
  };

  const getAnimeById = async (id: number) => {
    const response = await api.get(`/animes?id=${id}`);

    const data = response.data;
    console.log(data);
    setSelectedAnime(data[0]);
  };

  const addAnimeList = async (data: AnimesData) => {
    const postData = {
      title: data.title,
      category: data.category,
      rate: data.rate,
      banner_url: data.banner_url,
      image_url: data.image_url,
      original: data.original,
      status: data.status,
      launch_date: data.launch_date,
      studio: data.studio,
      synopsis: data.synopsis,
      userId: user.id,
      animeId: data.id,
    };

    console.log(postData);
    const response = await api.post("/mylist", postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
  };

  const getMyList = async (userId: number) => {
    const response = await api.get(`/users/${userId}/mylist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    setMyList(response.data);
  };

  const deleteMyList = async (userId: number) => {
    const response = await api.delete(`/mylist/${userId} `, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setMyList(response.data);
  };

  const searchAnime = (search: string) => {
    setSearched(search);
    const searched = search.toLowerCase();
    const filterAnimeName = animes.filter((anime) => {
      return anime.title.toLowerCase().includes(searched);
    });

    const filterAnimeCategory = animes.filter((anime) => {
      const category = anime.category.map((actual) => actual.toLowerCase());
      const filtered = category.filter((actual) => actual.includes(searched));

      if (filtered[0]) {
        return anime;
      }
    });

    if (filterAnimeName[0]) {
      setSearchList(filterAnimeName);
    } else if (filterAnimeCategory[0]) {
      setSearchList(filterAnimeCategory);
    }
  };

  return (
    <AnimeContext.Provider
      value={{
        getAnimes,
        getAnimeById,
        addAnimeList,
        getMyList,
        deleteMyList,
        searchAnime,
        setSearchList,
        setSearched,
        searched,
        animes,
        shounenAnimes,
        selectedAnime,
        myList,
        searchList,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

const useAnime = () => useContext(AnimeContext);

export { AnimeProvider, useAnime };
