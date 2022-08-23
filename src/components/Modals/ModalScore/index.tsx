import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "../../../Providers/UserProvider";
import { api, api2 } from "../../../services/api";
import { SliderThumbWithTooltip } from "./Slider";

interface Rate {
  userId: number;
  value: number;
}

interface AnimesData {
  id: string;
  title: string;
  categories: Array<object>;
  rate?: Array<Rate>;
  banner: string;
  image: string;
  original_title: string;
  status: string;
  launch_data: string;
  studio: string;
  sinopse: string;
  // usersWhoRated?: Array<number>;
}

interface ModalScoreProps {
  isOpen: boolean;
  onClose: () => void;
  // calcScore: () => void;
  selectedAnime: AnimesData;
}

export const ModalScore = ({
  isOpen,
  onClose,
  // calcScore,
  selectedAnime,
}: ModalScoreProps) => {
  const [sliderValue, setSliderValue] = useState<number>(1);

  const { user, accessToken } = useUser();

  const tokenBearer = {
    headers: {
      Authorization: `Token ${accessToken}`,
    },
  };

  const postRate = async (selectedAnime: AnimesData) => {
    api2
      .post(
        `/api/rate/${selectedAnime.id}/`,
        {
          rate: sliderValue,
        },
        tokenBearer
      )
      .catch((err) => {
        console.log("entrou no erro do post rate", err.request.status);
        api2.patch(
          `/api/rate/${selectedAnime.id}/`,
          {
            rate: sliderValue,
          },
          tokenBearer
        );
      });
  };

  //HANDLE-PATCH-DA-API
  const toEvaluate = async (selectedAnime: AnimesData) => {
    // const res = await api.get(`/animes?id=${selectedAnime.id}`, tokenBearer);
    const res = await api.get(`/api/rate/${selectedAnime.id}`, tokenBearer);

    const wasVoted = res.data[0].rate?.filter(
      (item: { userId: Number }) => item.userId === user.id
    );

    if (!wasVoted[0]) {
      const NewArrayRate = selectedAnime?.rate;

      NewArrayRate?.push({ userId: user.id, value: Number(sliderValue) * 2 });

      await api.patch(
        `/animes/${selectedAnime.id}`,
        { rate: NewArrayRate },
        tokenBearer
      );
    } else {
      const currentAnime = res.data[0];

      //INDEX-DO-VOTO-DO-USUÁRIO
      const indexOfUserVote = currentAnime.rate.indexOf(
        currentAnime.rate.filter(function (obj: { userId: number }) {
          return obj.userId === user.id;
        })[0]
      );

      //REDECLARAÇÃO-DO-VOTO-COM-O-NOVO-VALOR
      currentAnime.rate[indexOfUserVote] = {
        userId: user.id,
        value: Number(sliderValue) * 2, //NOVO-VOTO
      };

      await api.patch(`/animes/${selectedAnime.id}`, currentAnime, tokenBearer);
    }
    // calcScore();
  };

  //PEGA-O-VALOR-DO-ON-CHANGE
  const HandleChangeSetState = (value: number) => {
    setSliderValue(value);
  };

  //NO-CLICK-CHAMA-A-FUNÇÃO-DE-VOTO
  const handleToEvaluate = () => {
    postRate(selectedAnime).then(() => onClose());
    // toEvaluate(selectedAnime).then(() => onClose());
    setSliderValue(1); //APOS=>FECHO-O-MODAL-E-LIMPO-O-STATE
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        color="white"
        bgColor="gold.sand"
        fontWeight="extrabold"
        top="180px"
      >
        <ModalHeader fontSize="1.5rem" color="white" textAlign="center">
          Escolha um valor
        </ModalHeader>
        <ModalBody>
          <SliderThumbWithTooltip
            sliderValue={sliderValue}
            onChange={HandleChangeSetState}
          />
        </ModalBody>
        <ModalFooter justifyContent="center" bgColor="gold.light50">
          <Button
            width="90%"
            bgColor="grey.dark"
            color="white"
            _hover={{ background: "grey.greyStone" }}
            onClick={handleToEvaluate}
          >
            Avaliar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
