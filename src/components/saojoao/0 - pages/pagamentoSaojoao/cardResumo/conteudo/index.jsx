import React from 'react'
import styles from './styles.module.css'

const index = ({number , tickets}) => {
  return (
    <div className={styles.content}>
      <div className={styles.wrapper3} >
        <h3>{tickets[number]?.tipo}</h3>
        <h3>R$ {tickets[number]?.preco},00</h3>
        
      </div>

      <div className={styles.wrapper3} >
        <p>{tickets[number]?.descricao}</p>
        <p>{tickets[number]?.quantidade}x</p>
      </div>

      <div className={styles.divider}></div>
    </div>
  )
}

export default index