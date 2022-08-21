import Buttons from './Buttons'
import QuestionRadio from './QuestionRadio'
import {Box, Grid} from '@mui/material'
import {observer} from 'mobx-react-lite'
import Counter from './Counter'
import QuestionCheck from './QuestionCheck'
import List from './List'
import questions from '../models/Questions'
import QuestionInput from './QuestionInput'
import QuestionsNavigation from './QuestionsNavigation'

export default observer(() => {
  if (!questions.isSuccess) return <Box>Не удалось загрузить данные с сервера</Box>

  return (
    <Grid container>
      {(questions.isStarted || questions.isFinished) && (
        <>
          <Grid item xs={12}>
            {' '}
            <QuestionsNavigation />
          </Grid>

          <Grid item xs={1}></Grid>

          <Grid item xs={2}>
            <Counter />
            <br></br>
            <Buttons />
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={6}>
            <QuestionRadio />
            <QuestionCheck />
            <QuestionInput />
          </Grid>
        </>
      )}

      <Grid item xs={2}>
        <List />
      </Grid>
    </Grid>
  )
})
