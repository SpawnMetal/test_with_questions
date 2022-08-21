import questions from '../models/Questions'
import {red, green} from '@mui/material/colors'

class Questions {
  bright = 400

  // Возвращает цвет в зависимости от выбранных ответов
  getColor(value, selected) {
    let color = 'primary'
    let colorStyle = null

    if (questions.isFinished) {
      if (selected === value) {
        if (questions.isCorrectVariant(selected)) {
          color = 'success'
          colorStyle = green[this.bright]
        } else {
          color = 'error'
          colorStyle = red[this.bright]
        }
      } else if (questions.isCorrectVariant(value)) {
        color = 'success'
        colorStyle = green[this.bright]
      }
    }

    return {color, colorStyle}
  }
}

const questionsController = new Questions()
export default questionsController
