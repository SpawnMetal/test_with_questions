import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default observer(() => {
  if (!questions.isSuccess || questions.stateFinished) return null

  const handleClickNext = () => questions.nextQuestion()

  const handleClickBack = () => questions.previousQuestion()

  const handleClickEnd = () => questions.finish()

  return (
    <Stack direction="column" spacing={2}>
      {!questions.isFirst && (
        <Button onClick={handleClickBack} variant="contained">
          Назад
        </Button>
      )}

      {questions.isLast ? (
        <Button onClick={handleClickEnd} variant="contained" color="success">
          Завершить
        </Button>
      ) : (
        <Button onClick={handleClickNext} variant="contained">
          Далее
        </Button>
      )}
    </Stack>
  )
})
