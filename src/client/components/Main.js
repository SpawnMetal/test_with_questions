import Buttons from './Buttons'
import Question from './Question'
import {Grid} from '@mui/material'
import {observer} from 'mobx-react-lite'
import Counter from './Counter'

export default observer(() => {
  return (
    <Grid container>
      <Grid item xs={1}></Grid>

      <Grid item xs={2}>
        <Counter />
        <br></br>
        <Buttons />
      </Grid>
      <Grid item xs={1}></Grid>

      <Grid item xs={6}>
        <Question />
      </Grid>
    </Grid>
  )
})
