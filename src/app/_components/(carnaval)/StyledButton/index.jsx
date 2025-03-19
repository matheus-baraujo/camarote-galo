import React from 'react'
import styles from './styles.module.css'

const index = (props) => {
  return (
    <div className={styles.button} onClick={props.action}>
      <img src="/assets/botao.png" alt="botao"/>
      <p>{props.texto}</p>
    </div>
  )
}

export default index