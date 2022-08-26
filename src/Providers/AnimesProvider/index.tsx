import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api2 } from "../../services/api";

interface Children {
  children: ReactNode;
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
  selectedAnime: AnimesData;
  searchList: AnimesData[];
  searched: string;
  bestAnimes: AnimesData[];
  load: boolean;
  setLoad: (load: boolean) => void;

  setSearchList: (prevState: AnimesData[]) => void;
  getAnimeById: (id: string) => void;
  searchAnime: (search: string) => void;
  setSearched: (search: string) => void;
  getAllAnimes: () => void;
  getBestAnimes: (amount: number) => void;
  getAnimesByCategory: (category: string) => void;
}

const AnimeContext = createContext<AnimeProviderData>({} as AnimeProviderData);

const AnimeProvider = ({ children }: Children) => {
  const [animes, setAnimes] = useState<AnimesData[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimesData>(
    {} as AnimesData
  );
  const [searchList, setSearchList] = useState<AnimesData[]>([]);
  const [searched, setSearched] = useState("");
  const [bestAnimes, setBestAnimes] = useState<AnimesData[]>([]);
  const [load, setLoad] = useState(false);
  console.log("load", load);

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

  const searchAnime = (search: string) => {
    setSearched(search);

    const searchedLower = search.toLowerCase();

    const filterAnimeName = animes.filter((anime) => {
      return anime.title.toLowerCase().includes(searchedLower);
    });

    setSearchList(filterAnimeName);
  };

  return (
    <AnimeContext.Provider
      value={{
        getAnimeById,
        searchAnime,
        setSearchList,
        setSearched,
        getAllAnimes,
        getBestAnimes,
        getAnimesByCategory,
        searched,
        animes,
        selectedAnime,
        searchList,
        bestAnimes,
        load,
        setLoad,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
const useAnime = () => useContext(AnimeContext);

export { AnimeProvider, useAnime };
