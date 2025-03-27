import React from 'react'
import styles from './styles.module.css'

const index = () => {

  var assets = process.env.NEXT_PUBLIC_ASSETS_CARNAVAL;

  return (
    <>
      <div style={{backgroundColor: 'rgba(224, 215, 223, 0.6)', position: 'absolute', width:'100%', height:'100%', zIndex:'-2', top: 0, left: 0}}></div>

      <img src={"./"+assets+"/Logo.png"} className={styles.Logo} alt="Logo"/>
      <img src={"./"+assets+"/corner.png"} className={styles.cornerBottom} alt="corner"/>
      <img src={"./"+assets+"/corner.png"} className={styles.cornerTop} alt="corner"/>

      <img src={"./"+assets+"/Points.png"} className={styles.points} alt="points"/>
      <img src={"./"+assets+"/Points.png"} className={styles.points2} alt="points"/>
      <img src={"./"+assets+"/Points.png"} className={styles.points3} alt="points"/>
      <img src={"./"+assets+"/arrows.png"} className={styles.arrows} alt="arrows"/>
    </>
  )
}

export default index