import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";

interface SliderThumbWithTooltipProps {
  onChange: (value: number) => void;
  sliderValue: number;
}

export const SliderThumbWithTooltip = ({
  onChange,
  sliderValue,
}: SliderThumbWithTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <>
      <Flex
        paddingY="10px"
        justifyContent="flex-end"
        gap="50px"
        marginRight="-15px"
      >
        <AiTwotoneStar size={30} color="yellow" />
        <AiTwotoneStar size={30} color="yellow" />
        <AiTwotoneStar size={30} color="yellow" />
        <AiTwotoneStar size={30} color="yellow" />
        <AiTwotoneStar size={30} color="yellow" />
      </Flex>

      <Slider
        id="slider"
        defaultValue={1}
        min={0}
        max={5}
        colorScheme="teal"
        onChange={onChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={1} ml="-4px" fontSize="lg">
          1
        </SliderMark>
        <SliderMark value={2} ml="-4px" fontSize="lg">
          2
        </SliderMark>
        <SliderMark value={3} ml="-4px" fontSize="lg">
          3
        </SliderMark>
        <SliderMark value={4} ml="-4px" fontSize="lg">
          4
        </SliderMark>
        <SliderMark value={5} ml="-4px" fontSize="lg">
          5
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={sliderValue}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </>
  );
};
