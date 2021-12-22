import React from 'react'
import { Box, Center, Flex, Icon, Text, Image } from '@chakra-ui/react'
import { useInterval } from '@chakra-ui/hooks'
import pic from './images/secondpic.jpg'
import './App.css'
import { SunIcon } from '@chakra-ui/icons'

const END_DATE = new Date('2022-07-07T00:00:00')

const Knob: React.FC = () => {
  return (
    <Box
      bgColor="#1b3542"
      borderRadius="full"
      boxSizing="border-box"
      width="4%"
      padding="4%"
      position="relative"
      h="fit-content"
    >
      <Box
        bgColor="white"
        h="2vmin"
        pos="absolute"
        top="10%"
        left="47%"
        right="47%"
      />
    </Box>
  )
}

function App() {
  const [countDownTime, setCountDownTime] = React.useState<number>(
    Math.max(END_DATE.getTime() - new Date().getTime(), 0)
  )
  useInterval(() => {
    const now = new Date()
    setCountDownTime(Math.max(END_DATE.getTime() - now.getTime(), 0))
  }, 100)

  var days = Math.floor(countDownTime / 1000 / 60 / (60 * 24))
  var date_diff = new Date(countDownTime)

  const [lightOn, setLightOn] = React.useState(false)

  return (
    <Center bgColor="white" h="100vh" w="100vw">
      <Box bgColor="#c1c1c1" w="100vmin" h="100vmin">
        <Box direction="row" bgColor="#526477" mt="1vmin" mx="2vmin" h="15vmin">
          <Flex
            direction="row"
            h="full"
            align="center"
            gridGap="2vmin"
            mx="2vmin"
          >
            <Knob />
            <Knob />
            <Flex flex="1" h="100%" align="center" justify="center">
              <Box w="10%" ml="2vmin" />
              <Center bgColor="black" h="50%" w="50%">
                <Text color="white" fontSize="4vmin">
                  {days}d {date_diff.getHours().toString().padStart(2, '0')}:
                  {date_diff.getMinutes().toString().padStart(2, '0')}:
                  {date_diff.getSeconds().toString().padStart(2, '0')}
                </Text>
              </Center>
              <Icon
                as={SunIcon}
                ml="2vmin"
                w="10%"
                h="auto"
                cursor="pointer"
                onClick={() => setLightOn(!lightOn)}
                color={lightOn ? 'white' : 'gray.400'}
              />
            </Flex>
            <Knob />
            <Knob />
          </Flex>
        </Box>
        <Box
          mt="6vmin"
          h="4vmin"
          bgColor="#566478"
          borderRadius="5vmin"
          mx="2vmin"
        />
        <Center
          bgColor="black"
          m="2vmin"
          mt="6vmin"
          h="66vmin"
          borderRadius="4vmin"
        >
          <Image
            src={pic}
            alt="Ultrasound picture"
            display={lightOn ? 'block' : 'none'}
            w="85%"
            h="auto"
            pointerEvents="none"
          />
        </Center>
      </Box>
    </Center>
  )
}

export default App
