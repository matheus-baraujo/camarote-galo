import React from 'react'
import style from './styles.module.css'

const index = (props) => {
  return (
    <div className={style.Card}>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  )
}

export default index