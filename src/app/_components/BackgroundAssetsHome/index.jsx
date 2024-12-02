import React from 'react'
import styles from './styles.module.css'
import Fotos from './fotos'

const index = () => {
  return (
    <>
      <img src="./assets/corner.png" className={styles.cornerBottom} alt="corner"/>
      <img src="./assets/corner.png" className={styles.cornerTop} alt="corner"/>

      <img src="./assets/Points.png" className={styles.points} alt="points"/>
      <img src="./assets/Points.png" className={styles.points2} alt="points2"/>
      <img src="./assets/Points.png" className={styles.points3} alt="points3"/>
      <img src="./assets/Points.png" className={styles.points4} alt="points4"/>
      <img src="./assets/Points.png" className={styles.points5} alt="points5"/>

      <img src="./assets/arrows.png" className={styles.arrows} alt="arrows"/>

      <Fotos />
    </>
  )
}

export default index