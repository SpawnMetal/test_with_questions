import {useEffect} from 'react'
import Buttons from './components/Buttons'
import Question from './components/Question'
import questions from './models/Questions'
import './styles/app.css'

export default function App() {
  useEffect(() => {
    console.log('useEffect')
    questions.getQuestions()
  }, [])

  return (
    <>
      <Question />
      <Buttons />
    </>
  )
}
