import React from 'react'
import styles from './styles.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTicketSimple, faDownload, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope , faCalendar } from "@fortawesome/free-regular-svg-icons";

var info = [[faCalendar, 'far fa-calendar'],
            [faLocationDot, 'fas fa-location-dot'],
            [faTicketSimple, 'fas fa-ticket-simple'],
            [faDownload, 'fas fa-download'],
            [faEnvelope, 'far fa-envelope'],
            [faShareNodes, 'fas fa-share-nodes']]

const index = ({ticket}) => {

  var code = ''

  if(ticket.status !== 'Aprovado'){
    code = "******"
  }else{
    code = ticket.codigo
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.accessCodeContainer}>
        <h3>Código de acesso ao evento</h3>

        <div className={styles.codeBoxes}>
          {
            code.split('').map((num, index) => (
              <span key={index} className={styles.codeBox}>{num}</span>
            ))
          }
        </div>

        <p>Apresente este código na entrada do evento</p>
      </div>

      <div className={styles.eventDetails}>
        <h3><FontAwesomeIcon icon={info[2][0]} className={info[2][1]}></FontAwesomeIcon></h3>

        <h3>São João do Se você não for eu vou</h3>
        <p>
          <span className={styles.icon}><FontAwesomeIcon icon={info[0][0]} className={info[0][1]}></FontAwesomeIcon></span> Sábado, 7 de Junho de 2025 - 19h
        </p>
        <p>
          <span className={styles.icon}><FontAwesomeIcon icon={info[1][0]} className={info[1][1]}></FontAwesomeIcon></span> Freje - Recife Antigo
        </p>
        <p>{ticket.quantidade2}x Mesa para 4 pessoas + {ticket.quantidade1}x Ingresso Individual</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.download}> <FontAwesomeIcon icon={info[3][0]} className={info[3][1]}></FontAwesomeIcon> Baixar</button>
        <button className={styles.email}> <FontAwesomeIcon icon={info[4][0]} className={info[4][1]}></FontAwesomeIcon> Enviar por email</button>
        <button className={styles.share}> <FontAwesomeIcon icon={info[5][0]} className={info[5][1]}></FontAwesomeIcon> Compartilhar</button>
      </div>
      
    </div>
  )
}

export default index