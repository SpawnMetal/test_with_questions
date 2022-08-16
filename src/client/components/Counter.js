import {Box} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  return (
    <Box textAlign="center">
      <Box>
        {questions.currentNumber} / {questions.count}
      </Box>

      {questions.stateFinished && (
        <Box color={questions.numberOfCorrect === questions.count ? '#00ff00' : '#ff0000'}>
          {questions.numberOfCorrect} / {questions.count}
        </Box>
      )}
    </Box>
  )
})
