import React from 'react'
import styles from './styles.module.css?v=3'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faClock , faCalendar } from "@fortawesome/free-regular-svg-icons";

var info = [[faCalendar, 'far fa-calendar' ,'Data','07 de junho de 2025'],
            [faLocationDot, 'fas fa-location-dot' ,'Local','Frege Av. Rio Branco Recife Antigo'],
            [faMusic, 'far fa-music' ,'Atrações','Chica Dan \n\n As Januárias \n\n Vera Freitas \n\n Tomás Henrique'],
            [faClock, 'fas fa-clock' ,'Horário','Das 19h às 02h']]

var aux = ['As Januárias', 'Tomás Henrique', 'Vera Freitas', 'Chica Dan', 'Convidados especiais']

const index = (params) => {

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={info[params.item][0]} className={info[params.item][1] +' '+ styles.icon}></FontAwesomeIcon>
      <h3 className={styles.title}>{info[params.item][2]}</h3>

      {params.item == 2 ? 
        <p className={styles.text}>
          {aux[0]} <br/> {aux[1]} <br/> {aux[2]} <br/> {aux[3]} <br/> {aux[4]}

        </p>
      :
        <p className={styles.text}>{info[params.item][3]}</p>
      }
      
    </div>
  )
}

export default index