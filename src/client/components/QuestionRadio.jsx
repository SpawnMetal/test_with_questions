import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questionsController from '../Controllers/Questions'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isRadioButton) return null

  const pars = questions.pars

  const handleChange = event => {
    if (questions.isFinished) return
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>{pars.value}</FormLabel>
        <RadioGroup value={pars.selectedValues} onChange={handleChange}>
          {pars.variants.map((value, index) => {
            const {color, colorStyle} = questionsController.getColor(value, pars.selectedValues)
            return <FormControlLabel control={<Radio color={color} sx={{color: colorStyle}} />} value={value} label={value} key={index} style={{color: colorStyle}} />
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  )
})
