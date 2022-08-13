import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default observer(() => {
  const pars = questions.pars
  if (pars) return null

  const handleClickNext = event => {}

  const handleClickBack = event => {}

  const handleClickEnd = event => {}

  return (
    <>
      <Stack direction="row" spacing={2}>
        {!questions.isFirst && (
          <Button onClick={handleClickBack} variant="contained">
            Назад
          </Button>
        )}
        ,
        {questions.isLast ? (
          <Button onClick={handleClickNext} variant="contained">
            Далее
          </Button>
        ) : (
          <Button onClick={handleClickEnd} variant="contained" color="success">
            Завершить
          </Button>
        )}
      </Stack>
    </>
  )
})
