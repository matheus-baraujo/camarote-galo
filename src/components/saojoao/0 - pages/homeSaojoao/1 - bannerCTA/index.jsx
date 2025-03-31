import React from 'react'
import styles from './styles.module.css'

import { scroll } from '@/services/database'

const index = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={()=> scroll("ingressos")}>Garanta seu ingresso agora!</button>
    </div>
  )

}

export default index