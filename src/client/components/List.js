import {observer} from 'mobx-react-lite'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {useState} from 'react'
import questions from '../models/Questions'

export default observer(() => {
  const [open, setOpen] = useState([])

  if (questions.questionsListIsEmpty) return null

  const handleClick = index => {
    const newOpen = [...open]
    const findIndex = newOpen.indexOf(index)
    findIndex === -1 ? newOpen.push(index) : newOpen.splice(findIndex, 1)
    setOpen(newOpen)
  }

  const handleClickTestName = (theme, testName) => {
    questions.start(theme, testName)
  }

  const testNamesList = theme => {
    const result = []

    for (let testName of questions.questionsList[theme])
      result.push(
        <ListItemButton sx={{pl: 4}} key={testName} onClick={() => handleClickTestName(theme, testName)}>
          <ListItemText primary={testName} />
        </ListItemButton>,
      )

    return result
  }

  const themeList = () => {
    const result = []
    const thems = Object.keys(questions.questionsList)
    const getOpen = index => open.includes(index)

    for (let index in thems) {
      const theme = thems[index]
      const isOpen = getOpen(index)

      result.push(
        <>
          <ListItemButton onClick={() => handleClick(index)} key={theme}>
            <ListItemText primary={theme} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {testNamesList(theme)}
            </List>
          </Collapse>
        </>,
      )
    }

    return result
  }

  return (
    <List sx={{width: '100%', bgcolor: 'background.paper'}} component="nav">
      {themeList()}
    </List>
  )
})
