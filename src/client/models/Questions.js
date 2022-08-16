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
  question = {} // Параметры текущего вопроса
  getQuestionsStatus = '' // Статус получения данных с сервера
  numberOfCorrect = 0 // Количество правильных ответов
  stateFinished = false // Тест завершён

  getQuestionsStatusSuccess = 'success' // Успешный статус получения данных с сервера
  getQuestionsStatusError = 'error' // Статус получения данных с сервера с ошибкой

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
    this.selectedVariants[this.selectedTestQuestionIndex] = value
  }

  // Устанавливает все вопросы из файла
  setSelectedQuestionsTheme() {
    const questionsThemeFind = this.questions.find(par => Object.keys(par).includes(this.selectedTheme))
    this.selectedQuestionsTheme = questionsThemeFind[this.selectedTheme]
  }

  // Устанавливает все вопросы из файла по тесту
  setSelectedQuestionsThemeTestName() {
    this.selectedQuestionsThemeTestName = this.selectedQuestionsTheme.filter(par => par.testName === this.selectedTestName)
  }

  // Устанавливает параметры текущего вопроса
  setQuestion() {
    if (this.selectedVariants[this.selectedTestQuestionIndex] === undefined) {
      const add = typeof this.selectedQuestionsThemeTestName[this.selectedTestQuestionIndex].success === 'string' ? '' : []
      this.selectedVariants.push(add)
    }

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
    response
      .json()
      .then(result => {
        this.questions = result

        // Test
        this.start()

        this.setQuestionsStatus(this.getQuestionsStatusSuccess)
      })
      .catch(() => this.setQuestionsStatus(this.getQuestionsStatusError))
  }

  get isFirst() {
    return !this.selectedTestQuestionIndex
  }

  get isLast() {
    return this.selectedQuestionsThemeTestName.length - 1 === this.selectedTestQuestionIndex
  }

  get count() {
    return this.selectedQuestionsThemeTestName.length
  }

  get currentNumber() {
    return this.selectedTestQuestionIndex + 1
  }

  setQuestionsStatus(status) {
    this.getQuestionsStatus = status
  }

  get isSuccess() {
    return this.getQuestionsStatus === this.getQuestionsStatusSuccess
  }

  nextQuestion() {
    this.selectedTestQuestionIndex++
    this.setQuestion()
  }

  previousQuestion() {
    this.selectedTestQuestionIndex--
    this.setQuestion()
  }

  // Устанавливает количество верных овтетов
  setNumberOfCorrect() {
    this.numberOfCorrect = 0

    this.selectedQuestionsThemeTestName.forEach((element, index) => {
      if (typeof element.success === 'string') {
        if (element.success.toLowerCase() === this.selectedVariants[index].toLowerCase()) this.numberOfCorrect++
      } else {
        if (!element.success.length && !this.selectedVariants[index].length) {
          this.numberOfCorrect++
          return
        }

        let numberOfCorrectSub = 0

        for (let successVariant of element.success) {
          for (let selectedVariant of this.selectedVariants[index]) {
            if (successVariant.toLowerCase() === selectedVariant.toLowerCase()) {
              numberOfCorrectSub++
              continue
            }
          }

          if (numberOfCorrectSub === element.success.length) {
            this.numberOfCorrect++
            continue
          }
        }
      }
    })
  }

  finish() {
    this.stateFinished = true
    this.setNumberOfCorrect()
  }

  start() {
    this.stateFinished = false
    this.setSelectedTheme('example')
    this.setSelectedTestName('cars1')
    this.setSelectedTestQuestionIndex(0)
    this.setSelectedQuestionsTheme()
    this.setSelectedQuestionsThemeTestName()
    this.setQuestion()
  }
}

const questions = new Questions()
export default questions
