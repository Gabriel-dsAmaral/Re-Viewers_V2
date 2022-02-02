import { CardLinks } from "../../components/CardLinks";
import { Header } from "../../components/Header";
import { SectionContainer } from "../../components/SectionContainer";
import { useAnime } from "../../Providers/AnimesProvider";

export const Search = () => {
  const { searchList, searched, animes } = useAnime();

  let randomAnimes = [];

  for (let i = 0; i < 10; i++) {
    randomAnimes.push(animes[Math.floor(Math.random() * animes.length)]);
  }

  randomAnimes.map((atual, index, arr) => {
    let anterior = arr[index - 1];
    if (anterior !== undefined && anterior.title === atual.title) {
      randomAnimes[index] = animes[Math.floor(Math.random() * animes.length)];
    }
  });

  return (
    <div>
      <Header />
      <SectionContainer title={searched} animeList={searchList} />
      <CardLinks title="Relacionados" animes={randomAnimes} />
    </div>
  );
};
