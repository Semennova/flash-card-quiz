import React, { useState, useEffect, useRef } from 'react'
import s from './Questions.module.css'

export default function Question({question}) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState()

    const frontEl = useRef() // взяли эл-ты из dom, подобно getElementById
    const backEl = useRef()

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height //длина внешней стороны карточки, current возв-ет сам html элемент
        const backHeight = backEl.current.getBoundingClientRect().height // длина обратной стороны карточки
        setHeight(Math.max(frontHeight, backHeight, 100)) //выберет максимальное из этих трех значений, т.о высота не будет менее 100px
    }

    useEffect(setMaxHeight, [question.answer, question.question, question.options])
    useEffect(()=> {
        window.addEventListener('resize', setMaxHeight)
        return ()=> window.removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <div onClick={()=> setFlip(!flip)} className={`${s.card} ${flip ? 'flip' :  ''}`} style={{height}}>
            <div className={s.front} ref={frontEl}>
                {question.question}
                <div className={s.options}>
                    {question.options.map(option => (
                        <div className={s.option} key={option}>{option}</div>
                    ))}
                </div>
            </div>
            <div className={s.back} ref={backEl}>
                    <div>{question.answer}</div>
            </div>
        </div>
    )
}
