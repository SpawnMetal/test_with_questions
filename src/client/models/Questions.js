import {makeAutoObservable} from 'mobx'

class Questions {
  questions = [
    {
      theme: [
        {
          testName: '',
          elemType: '',
          value: '',
          variants: [''],
          success: '',
        },
      ],
    },
  ]

  selectedTheme = '' // Выбранный файл
  selectedTestName = '' // Выбранный тест
  selectedTestQuestionIndex = 0 // Выбранный номер вопроса
  selectedVariants = [] // Выбранные ответы в впросах
  selectedQuestionsTheme = [] // Все вопросы из файла
  selectedQuestionsThemeTestName = [] // Все вопросы из файла по тесту
  question = {}

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedTheme(selectedTheme) {
    this.selectedTheme = selectedTheme
  }

  setSelectedTestName(selectedTestName) {
    this.selectedTestName = selectedTestName
  }

  setSelectedTestQuestionIndex(selectedTestQuestionIndex) {
    this.selectedTestQuestionIndex = selectedTestQuestionIndex
  }

  setSelectedVariants(value) {
    if (typeof this.selectedTestQuestionIndex !== 'number') return
    if (!this.selectedVariants[this.selectedTestQuestionIndex]) this.selectedVariants.push(value)
    else this.selectedVariants[this.selectedTestQuestionIndex] = value
  }

  // Устанавливает все вопросы из файла
  setSelectedQuestionsTheme() {
    const questionsThemeFind = questions.find(par => Object.keys(par).includes(this.selectedTheme))
    this.selectedQuestionsTheme = questionsThemeFind[this.selectedTheme]
  }

  // Устанавливает все вопросы из файла по тесту
  setSelectedQuestionsThemeTestName() {
    this.selectedQuestionsThemeTestName = this.selectedQuestionsTheme.filter(par => par.testName === this.selectedTestName)
  }

  // Устанавливает параметры текущего вопроса
  setQuestion() {
    this.question = this.selectedQuestionsThemeTestName[this.selectedTestQuestionIndex]
  }

  // Получает параметры, необходимые для отображения в вопросе
  get pars() {
    return {
      elemType: this.question.elemType,
      value: this.question.value,
      variants: this.question.variants,
    }
  }

  *getQuestions() {
    const response = yield fetch('http://localhost:3300/questions')
    response.json().then(result => (this.question = result))
  }

  get isFirst() {
    return !this.selectedTestQuestionIndex
  }

  get isLast() {
    return this.questions[this.selectedTheme].length === this.selectedTestQuestionIndex
  }
}

const questions = new Questions()
export default questions
