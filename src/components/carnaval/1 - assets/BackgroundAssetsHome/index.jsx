import React from 'react'
import styles from './styles.module.css'
import Fotos from './fotos'

const index = () => {
  return (
    <>
      <div style={{backgroundColor: 'rgba(224, 215, 223, 0.6)', position: 'absolute', width:'100%', height:'100%', zIndex:'-2', top: 0, left: 0}}></div>

      <img src="/(carnaval)/assets/corner.png" className={styles.cornerBottom} alt="corner"/>
      <img src="/(carnaval)/assets/corner.png" className={styles.cornerTop} alt="corner"/>

      <img src="/(carnaval)/assets/Points.png" className={styles.points} alt="points"/>
      <img src="/(carnaval)/assets/Points.png" className={styles.points2} alt="points2"/>
      <img src="/(carnaval)/assets/Points.png" className={styles.points3} alt="points3"/>
      <img src="/(carnaval)/assets/Points.png" className={styles.points4} alt="points4"/>
      <img src="/(carnaval)/assets/Points.png" className={styles.points5} alt="points5"/>

      <img src="/(carnaval)/assets/arrows.png" className={styles.arrows} alt="arrows"/>

      <Fotos />
    </>
  )
}

export default index