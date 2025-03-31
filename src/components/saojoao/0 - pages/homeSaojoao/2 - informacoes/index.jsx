import React from 'react'
import styles from './styles.module.css'

import { scroll } from '@/services/database'

import Flag from './flag';

const index = () => {

  var items = [0,1,2,3]

  return (
    <div className={styles.wrapper}>

      <div className={styles.wrapper2}>
        <h2 className={styles.title}>Informações do evento</h2>

        <button className={styles.button} onClick={()=> scroll("ingressos")}>Comprar agora</button>
      </div>

      <div className={styles.wrapper3}>

        {items.map((element, index) => (
          <Flag key={index} item={element} />
        ))}
      </div>
      
    </div>
  )
}

export default index