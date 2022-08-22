import {Box, FormLabel, TextField} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questionsController from '../Controllers/Questions'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isInput) return null

  const pars = questions.pars
  const {color} = questionsController.getColor(pars.selectedValues, pars.selectedValues)

  const handleChange = event => {
    if (questions.isFinished) {
      event.target.value = pars.selectedValues
      return
    }

    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormLabel>{pars.value}</FormLabel>
      <br></br>
      <TextField color={color} focused label="Введите текст" variant="standard" onChange={handleChange} />
    </Box>
  )
})
