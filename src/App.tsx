import { useInterval } from '@chakra-ui/hooks'

import firstpic from './images/firstpic.jpg'
import './App.css'
import React from 'react'

const END_DATE = new Date('2022-07-07T00:00:00')

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={firstpic} className="Peanut-pic" alt="First picture" />
        <p>
          Arriving in approximately
          <br />
          {days} Days {date_diff.getHours()} Hours {date_diff.getMinutes()}{' '}
          Minutes {date_diff.getSeconds()} Seconds
          <br />
          (July 7th, 2020)
        </p>
      </header>
    </div>
  )
}

export default App
