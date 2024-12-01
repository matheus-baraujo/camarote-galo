import React from 'react'
import styles from './styles.module.css'

const index = () => {
  return (
    <>
      <img src="./assets/Logo.png" className={styles.Logo} alt="Logo"/>
      <img src="./assets/corner.png" className={styles.cornerBottom} alt="corner"/>
      <img src="./assets/corner.png" className={styles.cornerTop} alt="corner"/>

      <img src="./assets/Points.png" className={styles.points} alt="points"/>
      <img src="./assets/Points.png" className={styles.points2} alt="points"/>
      <img src="./assets/Points.png" className={styles.points3} alt="points"/>
      <img src="./assets/arrows.png" className={styles.arrows} alt="arrows"/>
    </>
  )
}

export default index