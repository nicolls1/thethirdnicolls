import React from 'react'
import {
  Box,
  Center,
  IconButton,
  Stack,
  Text,
  useTimeout,
  useControllableState,
} from '@chakra-ui/react'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'

interface LabelledImageProps {
  date: string
  url: string
}

const LabelledImage: React.FC<LabelledImageProps> = ({ date, url }) => {
  return (
    <Center
      pos="relative"
      display="inline-block"
      width="82vmin"
      height="100%"
      borderRadius="md"
      bgSize="cover"
      bgImage={`url(${url})`}
    >
      <Text position="absolute" top={4} left={4} color="white" size="sm">
        {new Date(date).toLocaleDateString()}
      </Text>
    </Center>
  )
}

interface Props {
  images: LabelledImageProps[]
  activeIndex?: number
  onActiveIndexChange?: (newIndex: number) => void
}

const ImageGallery: React.FC<Props> = ({
  images,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
}) => {
  const [activeIndex, setActiveIndex] = useControllableState({
    value: activeIndexProp,
    onChange: onActiveIndexChange,
    defaultValue: images.length - 1,
  })
  const [transition, setTransition] = React.useState<number>()
  useTimeout(
    () => {
      if (transition) {
        setActiveIndex(transition + activeIndex)
        setTransition(undefined)
      }
    },
    transition ? 200 : null
  )
  const transitionActiveIndex = activeIndex + (transition ?? 0)
  return (
    <Box
      pos="relative"
      bgColor="black"
      borderRadius="md"
      height="100%"
      w="100%"
      overflow="clip"
      transition="all 0.25s ease 0s"
      role="group"
    >
      <Box
        animation={
          !transition
            ? undefined
            : transition > 0
            ? 'image_gallery_left 400ms linear'
            : 'image_gallery_right 400ms linear'
        }
        w="max-content"
        minW="100%"
        height="100%"
      >
        {images.map(
          (image, index) =>
            (index === activeIndex ||
              (transition && index === activeIndex + transition)) && (
              <LabelledImage key={index} {...image} />
            )
        )}
      </Box>
      <IconButton
        minW="30px"
        boxSize="30px"
        icon={<ChevronLeftIcon color="gray.700" />}
        aria-label="scroll image left"
        borderRadius="full"
        bgColor="rgba(255, 255, 255, .9)"
        _hover={{
          bgColor: 'white',
          transform: 'scale(1.04) translate(0, -50%)',
          shadow: 'base',
        }}
        shadow="sm"
        pos="absolute"
        top="50%"
        transform="translate(0, -50%)"
        left="16px"
        border="1px solid"
        borderColor="rgba(0,0,0,.08)"
        onClick={() => setTransition(-1)}
        display="none"
        _focus={{
          shadow: 'sm',
        }}
        _groupHover={{
          display: activeIndex > 0 ? 'initial' : 'none',
        }}
      />
      <IconButton
        minW="30px"
        boxSize="30px"
        icon={<ChevronRightIcon color="gray.700" />}
        aria-label="scroll image right"
        borderRadius="full"
        bgColor="rgba(255, 255, 255, .9)"
        _hover={{
          bgColor: 'white',
          transform: 'scale(1.04) translate(0, -50%)',
          shadow: 'base',
        }}
        shadow="sm"
        pos="absolute"
        top="50%"
        transform="translate(0, -50%)"
        right="16px"
        border="1px solid"
        borderColor="rgba(0,0,0,.08)"
        display="none"
        onClick={() => setTransition(1)}
        _focus={{
          shadow: 'sm',
        }}
        _groupHover={{
          display: activeIndex < images.length - 1 ? 'initial' : 'none',
        }}
      />
      <Center
        pos="absolute"
        right="0"
        left="0"
        bottom="8px"
        display="none"
        _groupHover={{
          display: 'flex',
        }}
      >
        <Box width="55px" overflow="clip">
          <Stack
            direction="row"
            spacing="5px"
            justify="center"
            transition={`
              -ms-transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s,
              -webkit-transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s,
              transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s
            `}
            transform={`translateX(-${
              11 *
              Math.max(
                Math.min(
                  activeIndex - 2 + (transition ?? 0),
                  images.length - 5
                ),
                0
              )
            }px)`}
            width="fit-content"
          >
            {images.map((_image, idx) => (
              <Box
                key={idx}
                bgColor="white"
                borderRadius="full"
                boxSize="6px"
                opacity={idx === transitionActiveIndex ? '1' : '0.6'}
                transition="opacity 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s"
                transform={`scale(${
                  Math.max(
                    Math.min(
                      6 +
                        (transitionActiveIndex === 0 ||
                        transitionActiveIndex === images.length - 1
                          ? 2
                          : 1) -
                        Math.abs(
                          idx -
                            transitionActiveIndex +
                            (transitionActiveIndex === 2 ? 1 : 0) +
                            (transitionActiveIndex === images.length - 3
                              ? -1
                              : 0)
                        ),
                      6
                    ),
                    4
                  ) / 6
                })`}
              />
            ))}
          </Stack>
        </Box>
      </Center>
    </Box>
  )
}
export default ImageGallery
