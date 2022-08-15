import {Box} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  return (
    <Box textAlign="center">
      {questions.currentNumber} / {questions.count}
    </Box>
  )
})
