import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isSuccess) return null

  const pars = questions.pars

  const handleChange = event => {
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>{pars.value}</FormLabel>
        <RadioGroup onChange={handleChange}>
          {pars.variants.map(value => (
            <FormControlLabel value={value} control={<Radio />} label={value} key={value} />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
})
