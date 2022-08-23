import { createContext, ReactNode, useContext, useState } from "react";
import { api, api2 } from "../../services/api";
import { useUser } from "../UserProvider";

interface Children {
  children: ReactNode;
}

interface Rate {
  userId: number;
  value: number;
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
interface AnimeProviderData {
  animes: AnimesData[];
  myList: AnimesData[] | object;
  shounenAnimes: AnimesData[];
  selectedAnime: AnimesData;
  searchList: AnimesData[];
  searched: string;
  bestAnimes: AnimesData[];

  setSearchList: (prevState: AnimesData[]) => void;
  getAnimeById: (id: string) => void;
  getMyList: (userId: number) => void;
  deleteMyList: (userId: number) => void;
  addAnimeList: (data: AnimesData) => void;
  searchAnime: (search: string) => void;
  setSearched: (search: string) => void;
  getAllAnimes: () => void;
  getBestAnimes: (amount: number) => void;
  getAnimesByCategory: (category: string) => void;
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
  const [bestAnimes, setBestAnimes] = useState<AnimesData[]>([]);

  const getAllAnimes = async () => {
    const response = await api2.get("/api/animes/");
    setAnimes(response.data);
  };

  const getBestAnimes = async (amount: number) => {
    const response = await api2.get(`/api/animes/best/${amount}/`);
    setBestAnimes(response.data);
  };

  const getAnimeById = async (id: string) => {
    const response = await api2.get(`/api/animes/one/${id}/`);
    setSelectedAnime(response.data);
  };

  const getAnimesByCategory = async (category: string) => {
    const response = await api2.get(`/api/animes/category/?${category}`);
    setSearchList(response.data[0]);
  };

  const addAnimeList = async (data: AnimesData) => {
    const postData = {
      title: data.title,
      category: data.category,
      rate: data.rate,
      banner_url: data.banner,
      image_url: data.image,
      original: data.original_title,
      status: data.status,
      launch_date: data.launch_data,
      studio: data.studio,
      synopsis: data.sinopse,
      userId: user.id,
      animeId: data.id,
    };

    await api.post("/mylist", postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const getMyList = async (userId: number) => {
    const response = await api.get(`/users/${userId}/mylist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
    const searchedLower = search.toLowerCase();
    const filterAnimeName = animes.filter((anime) => {
      return anime.title.toLowerCase().includes(searchedLower);
    });

    // eslint-disable-next-line array-callback-return
    const filterAnimeCategory = animes.filter((anime) => {
      const category = anime.categories.map((actual) => actual.toLowerCase());
      const filtered = category.filter((actual) =>
        actual.includes(searchedLower)
      );

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
        getAnimeById,
        addAnimeList,
        getMyList,
        deleteMyList,
        searchAnime,
        setSearchList,
        setSearched,
        getAllAnimes,
        getBestAnimes,
        getAnimesByCategory,
        searched,
        animes,
        shounenAnimes,
        selectedAnime,
        myList,
        searchList,
        bestAnimes,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

const useAnime = () => useContext(AnimeContext);

export { AnimeProvider, useAnime };
