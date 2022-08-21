import Buttons from './Buttons'
import QuestionRadio from './QuestionRadio'
import {Grid} from '@mui/material'
import {observer} from 'mobx-react-lite'
import Counter from './Counter'
import QuestionCheck from './QuestionCheck'
import List from './List'
import questions from '../models/Questions'

export default observer(() => {
  return (
    <Grid container>
      {(questions.isStarted || questions.isFinished) && (
        <>
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
          </Grid>
        </>
      )}

      <Grid item xs={2}>
        <List />
      </Grid>
    </Grid>
  )
})
