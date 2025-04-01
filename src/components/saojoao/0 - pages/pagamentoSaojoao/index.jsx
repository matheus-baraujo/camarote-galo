'use client'

import React, {useState} from 'react'
import styles from './styles.module.css'
import CardIngresso from './cardIngresso'
import CardResumo from './cardResumo'

import LoginModal from '../../1 - others/loginModal'

const index = () => {

  const [ingressos, setIngressos] = useState([
    { tipo: "Ingresso Individual", descricao: 'Acesso ao evento', preco: 70, quantidade: 0 },
    { tipo: "Mesa de até 4 pessoas", descricao: 'Reserva de mesa completa', preco: 250, quantidade: 0 }
  ])

  const [login, setLogin] = useState(false) //não está logado

  const [logar, setLogar] = useState(false) // habilitar o modal de login

  return (
    <div className={styles.wrapper}>

      <div className={styles.wrapper2}>
        <CardIngresso number={0} tickets={ingressos} setTickets={setIngressos}/>
        <CardIngresso number={1} tickets={ingressos} setTickets={setIngressos}/>
      </div>

      <CardResumo number={0} tickets={ingressos} login={login} setLogin={setLogin} logar={logar} setLogar={setLogar}/>

      {logar ?  <LoginModal  setLogar={setLogar}/> : <></>}
      

    </div>
  )
}

export default index