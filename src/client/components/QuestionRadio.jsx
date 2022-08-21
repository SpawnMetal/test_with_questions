import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isRadioButton) return null

  const pars = questions.pars

  const handleChange = event => {
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>{pars.value}</FormLabel>
        <RadioGroup value={pars.selectedValues} onChange={handleChange}>
          {pars.variants.map((value, index) => (
            <FormControlLabel control={<Radio />} value={value} label={value} key={index} />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
})
