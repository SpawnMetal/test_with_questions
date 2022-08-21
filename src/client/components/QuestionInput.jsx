import {Box, FormLabel, TextField} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isInput) return null

  const pars = questions.pars

  const handleChange = event => {
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormLabel>{pars.value}</FormLabel>
      <br></br>
      <TextField label="Введите текст" variant="standard" onChange={handleChange} />
    </Box>
  )
})
