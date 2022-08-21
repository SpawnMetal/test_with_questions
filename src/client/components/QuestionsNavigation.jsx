import {Box, Button, ButtonGroup} from '@mui/material'
import {observer} from 'mobx-react-lite'
import questions from '../models/Questions'

export default observer(() => {
  const buttons = []

  const handleClick = index => questions.goQuestion(index)

  for (let i = 0; i < questions.questionsCount; i++) {
    let color = 'inherit'

    if (questions.isSelectedVariants(i)) color = 'primary'

    buttons.push(
      <Button key="two" color={color} onClick={() => handleClick(i)}>
        {i + 1}
      </Button>,
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small">{buttons}</ButtonGroup>
    </Box>
  )
})
