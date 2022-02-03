import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  isCorrectLastRow: boolean
}

export const CompletedRow = ({ guess, isCorrectLastRow }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={isCorrectLastRow ? 'special' : statuses[i]}
        />
      ))}
    </div>
  )
}
