import React from 'react'
import styles from './styles.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTicketSimple, faCartShopping } from '@fortawesome/free-solid-svg-icons';

var info = [[faTicketSimple, 'fas fa-ticket-simple'],
            [faUser, 'fas fa-user'],
            [faCartShopping, 'fas fa-cart-shopping']]

const index = () => {
  return (
    <div className={styles.wrapper}> 

      <div className={styles.wrapper2}>

        <div className={styles.title}><h3>Olá! O que gostaria de fazer?</h3></div>

        <div className={styles.content}>

          <p>Escolha uma das opções abaixo:</p>
          
          <button><FontAwesomeIcon icon={info[1][0]} className={info[1][1]}></FontAwesomeIcon>  Meus Dados</button>

          <button><FontAwesomeIcon icon={info[0][0]} className={info[0][1]}></FontAwesomeIcon>  Verificar Ingressos</button>

          <button><FontAwesomeIcon icon={info[2][0]} className={info[2][1]}></FontAwesomeIcon>  Comprar ingressos</button>
          

        </div>

      </div>

      
    </div>
  )
}

export default index