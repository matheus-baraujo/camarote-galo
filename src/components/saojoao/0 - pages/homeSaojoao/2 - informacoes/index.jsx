import React from 'react'
import styles from './styles.module.css'

import { faLocationDot, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faClock , faCalendar } from "@fortawesome/free-regular-svg-icons";

import Flag from './flag';

const index = () => {

  var items = [0,1,2,3]

  return (
    <div className={styles.wrapper}>

      <div className={styles.wrapper2}>
        <h2 className={styles.title}>Informações do evento</h2>

        <button className={styles.button}>Comprar agora</button>
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