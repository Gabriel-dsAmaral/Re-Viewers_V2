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
import { api } from "../../../services/api";
import { SliderThumbWithTooltip } from "./Slider";

interface Rate {
  userId: number;
  value: number;
}

interface AnimesData {
  id: number;
  title: string;
  category: Array<string>;
  rate?: Array<Rate>;
  banner_url: string;
  image_url: string;
  original: string;
  status: string;
  launch_date: string;
  studio: string;
  synopsis: string;
  usersWhoRated?: Array<number>;
}

interface ModalScoreProps {
  isOpen: boolean;
  onClose: () => void;
  calcScore: () => void;
  selectedAnime: AnimesData;
}

export const ModalScore = ({
  isOpen,
  onClose,
  calcScore,
  selectedAnime,
}: ModalScoreProps) => {
  const [sliderValue, setSliderValue] = useState<number>(1);

  const { user, accessToken } = useUser();

  const tokenBearer = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  //HANDLE-PATCH-DA-API
  const toEvaluate = async (selectedAnime: AnimesData) => {
    const res = await api.get(`/animes?id=${selectedAnime.id}`, tokenBearer);

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
    calcScore();
  };

  //PEGA-O-VALOR-DO-ON-CHANGE
  const HandleChangeSetState = (value: number) => {
    setSliderValue(value);
  };

  //NO-CLICK-CHAMA-A-FUNÇÃO-DE-VOTO
  const handleToEvaluate = () => {
    toEvaluate(selectedAnime).then(() => onClose());
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
