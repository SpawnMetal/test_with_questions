import {useEffect} from 'react'
import Header from './components/Header'
import Main from './components/Main'
import questions from './models/Questions'
import './styles/app.css'

export default function App() {
  useEffect(() => {
    console.log('useEffect')
    questions.getQuestions()
  }, [])

  return (
    <>
      <Header />
      <Main />
    </>
  )
}
