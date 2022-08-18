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
  selectedQuestionsTheme = [] // Все тесты из файла
  selectedQuestionsThemeTestName = [] // Все вопросы из файла по тесту
  question = {} // Параметры текущего вопроса
  getQuestionsStatus = '' // Статус получения данных с сервера
  numberOfCorrect = 0 // Количество правильных ответов
  stateFinished = false // Тест завершён
  questionsList = {} // Список с тестами по теме {theme1: [testName, testName2]}

  getQuestionsStatusSuccess = 'success' // Успешный статус получения данных с сервера
  getQuestionsStatusError = 'error' // Статус получения данных с сервера с ошибкой
  radioButtonType = 'radio'
  checkBoxType = 'check'
  inputType = 'input'

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

  // Устанавливает выбранное значение в вопросе
  setSelectedVariants(value) {
    if (this.isStringType) this.selectedVariants[this.selectedTestQuestionIndex] = value
    else {
      const selectedValue = this.selectedVariants[this.selectedTestQuestionIndex]
      let checked = true

      for (let i in selectedValue)
        if (selectedValue[i].toLowerCase() === value.toLowerCase()) {
          checked = false
          selectedValue.splice(i, 1)
          break
        }

      if (checked) selectedValue.push(value)
    }
  }

  isSelected(value) {
    const selectedValue = this.selectedVariants[this.selectedTestQuestionIndex]
    for (let selVal of selectedValue) if (selVal.toLowerCase() === value.toLowerCase()) return true
    return false
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

  // Получает тип ответа в текущем вопросе - строка
  get isStringType() {
    return typeof this.selectedQuestionsThemeTestName[this.selectedTestQuestionIndex].success === 'string'
  }

  // Устанавливает параметры текущего вопроса
  setQuestion() {
    if (this.selectedVariants.length === this.selectedTestQuestionIndex) {
      const add = this.isStringType ? '' : []
      this.selectedVariants.push(add)
    }

    this.question = this.selectedQuestionsThemeTestName[this.selectedTestQuestionIndex]
  }

  // Получает параметры, необходимые для отображения в вопросе
  get pars() {
    return {
      value: this.question.value,
      variants: this.question.variants,
      selectedValues: this.selectedVariants[this.selectedTestQuestionIndex],
    }
  }

  *getQuestions() {
    const response = yield fetch('http://localhost:3300/questions')
    response
      .json()
      .then(result => {
        this.questions = result
        this.start() // Test
        this.setQuestionsList()
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

  get isRadioButton() {
    return this.question.elemType === this.radioButtonType
  }

  get isCheckBox() {
    return this.question.elemType === this.checkBoxType
  }

  get isInput() {
    return this.question.elemType === this.inputType
  }

  // Устанавливает список с тестами
  setQuestionsList() {
    this.questions.forEach(question => {
      const theme = Object.keys(question)[0]
      const testNames = new Set()

      for (let test of question[theme]) testNames.add(test.testName)

      this.questionsList[theme] = [...testNames]
    })
  }

  get questionsListIsEmpty() {
    if (!this.isSuccess) return true
    return !Object.keys(this.questionsList).length
  }
}

const questions = new Questions()
export default questions
