import { useEffect } from "react";
import { useAnime } from "../../Providers/AnimesProvider";

interface AnimeId {
  id: number;
}

export const AnimePage = () => {
  const { getAnimeById, selectedAnime } = useAnime();

  useEffect(() => {
    getAnimeById(53);
    console.log(selectedAnime);
  }, []);
  console.log(selectedAnime);

  return (
    <div>
      <img src="https://tm.ibxk.com.br/2017/11/27/27085616853003.jpg?ims=704x264" />
    </div>
  );
};
