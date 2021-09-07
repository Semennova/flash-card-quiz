import React from 'react'
import Question from './Question'
import s from './Questions.module.css'

export default function QuestionList({questions}) {
    return (
        <div className={s.cardGrid}>
            {questions.map(question => (
                <Question key={question.id} question={question}/>
                
            ))}
        </div>
    )
}
