import {FormLabel, FormControlLabel, Box, FormGroup, Checkbox} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  if (!questions.isCheckBox) return null

  const pars = questions.pars

  const handleChange = event => {
    questions.setSelectedVariants(event.target.value)
  }

  return (
    <Box>
      <FormGroup onChange={handleChange}>
        <FormLabel>{pars.value}</FormLabel>
        {pars.variants.map((value, index) => (
          <FormControlLabel control={<Checkbox />} value={value} label={value} checked={questions.isChecked(value)} key={index} />
        ))}
      </FormGroup>
    </Box>
  )
})
