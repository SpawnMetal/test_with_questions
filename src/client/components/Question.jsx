import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  const pars = questions.pars
  if (pars) return null

  const handleChange = event => {
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <FormControl>
      <FormLabel>{pars.value}</FormLabel>
      <RadioGroup onChange={handleChange}>
        {pars.variants.map(value => (
          <FormControlLabel value={value} control={<Radio />} label={value} />
        ))}
      </RadioGroup>
    </FormControl>
  )
})
