import React from 'react'
import styles from './styles.module.css'

const index = () => {
  return (
    <div className={styles.Container}>
      <img src="/assets/Open food.png" alt="open food" />

      <p>
          <ul>
            <li>Frutas - Início às 8h até às 9:30h</li>
            <li>Salgados tipo coquetel - Início às 10h até às 14h (rodadas a cada  30 minutos). </li>
            <li>Buffet de Feijoada - Início às 11:30h até às 13h</li>
          </ul>
      </p>
      
    </div>
  )
}

export default index