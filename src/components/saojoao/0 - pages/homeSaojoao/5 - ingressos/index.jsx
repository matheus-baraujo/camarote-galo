import React from 'react'
import styles from './styles.module.css'
import CardIngresso from './cardIngresso'

const index = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Ingressos</h1>
      
      <div className={styles.wrapper2}>

        {
          [0,1].map((item) => {
            return (
              <div key={item}>
                <CardIngresso item={item}/>
              </div>
            )
          })
        }
        
      </div>
      
    </div>
  )
}

export default index