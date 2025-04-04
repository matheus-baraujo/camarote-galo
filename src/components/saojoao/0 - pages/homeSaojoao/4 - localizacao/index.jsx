import React from 'react'
import styles from './styles.module.css'

const index = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Localização</h1>
      
      <div className={styles.wrapper2}>
        <div className={styles.wrapper3}>
          <h3 className={styles.text}>Frege</h3>
          <p className={styles.text2}>Av. Rio Branco, 155 - Recife, PE 50030-310, Recife Antigo</p>
        </div>
        
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1174.4524537420605!2d-34.873259534624616!3d-8.063543053002402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab19048c285d9b%3A0xd21643478025599e!2sFrege!5e0!3m2!1spt-PT!2sbr!4v1743345886048!5m2!1spt-PT!2sbr" 
        className={styles.map}
        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        
      </div>
    </div>
  )
}

export default index