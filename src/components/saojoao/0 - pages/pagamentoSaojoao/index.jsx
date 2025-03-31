'use client'

import React, {useState} from 'react'
import styles from './styles.module.css'
import CardIngresso from './cardIngresso'
import CardResumo from './cardResumo'

const index = () => {

  const [ingressos, setIngressos] = useState([
    { tipo: "Ingresso Individual", descricao: 'Acesso ao evento', preco: 70, quantidade: 0 },
    { tipo: "Mesa de até 4 pessoas", descricao: 'Reserva de mesa completa', preco: 250, quantidade: 0 }
  ])

  return (
    <div className={styles.wrapper}>

      <div className={styles.wrapper2}>
        <CardIngresso number={0} tickets={ingressos} setTickets={setIngressos}/>
        <CardIngresso number={1} tickets={ingressos} setTickets={setIngressos}/>
      </div>

      <CardResumo number={0} tickets={ingressos}/>

    </div>
  )
}

export default index