import React, { useRef, useEffect } from 'react'
import * as axios from 'axios'
import s from './Form.module.css'

export default function Form({ categories, handleSubmit, setCategories}) {
    
    const categoryEl = useRef()
    const amountEl = useRef()
    
    useEffect(()=> {
        axios.get('https://opentdb.com/api_category.php')
        .then(res => {
          setCategories(res.data.trivia_categories)
        })
      }, [])
    
      return (
        <div>
            <form className={s.header} onSubmit={handleSubmit}>
                <div className={s.formGroup}>
                    <label htmlFor='category'>Category</label>
                        <select id='category' ref={categoryEl}>
                            {categories.map(category => {
                            return <option value={category.id} key={category.id}>{category.name}</option>
                            })}
                        </select>
                </div>

                <div className={s.formGroup}>
                    <label htmlFor='amount'>Amount</label>
                        <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountEl}/>
                </div>

                <div className={s.formGroup}>
                    <button className={s.btn}>Generate</button>
                </div>
            </form>
        </div>
    )
}
