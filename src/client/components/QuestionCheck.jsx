import {FormLabel, FormControlLabel, Box, FormGroup, Checkbox} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questionsController from '../Controllers/Questions'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isCheckBox) return null

  const pars = questions.pars

  const handleChange = event => {
    if (questions.isFinished) return
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormGroup onChange={handleChange}>
        <FormLabel>{pars.value}</FormLabel>
        {pars.variants.map((value, index) => {
          const {color, colorStyle} = questionsController.getColor(value, value)
          return (
            <FormControlLabel control={<Checkbox color={color} sx={{color: colorStyle}} />} value={value} label={value} checked={questions.isChecked(value)} key={index} style={{color: colorStyle}} />
          )
        })}
      </FormGroup>
    </Box>
  )
})
