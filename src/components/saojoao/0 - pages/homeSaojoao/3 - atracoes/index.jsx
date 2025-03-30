import React from 'react'
import styles from './styles.module.css'

const index = () => {
  return (
    <div className={styles.wrapper}>

      <h1 className={styles.title}>Nosso São João vai ser danado de bom!</h1>

      <div className={styles.wrapper2}>
        <p className={styles.text}>06 HORAS DE FORRÓ!!</p>
        
        <img className={styles.artists} src="/saojoao/assets/artistas.webp" alt="artistas" />
      </div>

    </div>
  )
}

export default index