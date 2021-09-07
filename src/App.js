import './App.css'
import QuestionList from './Components/Questions/QuestionList'
import * as axios from 'axios'
import { useState } from 'react'
import Form from './Components/Form/Form'

function App() {

  const [questions, setQuestions] = useState([])
  const [categories, setCategories] = useState([])

  
  const decodeString = (str) => {
    const texArea = document.createElement('textarea')
    texArea.innerHTML = str
      return texArea.value
  }


  const handleSubmit = (e) => {
    e.preventDefault()
      axios.get('https://opentdb.com/api.php?amount=10')
        .then(response => {
          setQuestions(response.data.results.map((questionItem, index) => {
            const answer = questionItem.correct_answer
            const options = [
              ...questionItem.incorrect_answers.map(a => decodeString(a)), 
              decodeString(answer)]
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: decodeString(answer),
              options: options.sort(() => Math.random() - .5)
            }
          }))
      }) 
  }

  return (
<>
  <Form categories={categories}
        handleSubmit={handleSubmit} 
        setCategories={setCategories}/>

  <div className='container'>
      <QuestionList questions={questions}/>
  </div>
</>
  );
}

export default App;
