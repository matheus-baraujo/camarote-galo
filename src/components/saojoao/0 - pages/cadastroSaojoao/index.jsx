'use client'

import React, {useState} from 'react'
import styles from './styles.module.css'

import FormCadastro from './formCadastro'
import Steps from '../../1 - others/steps'

const index = () => {

  const [ingressos, setIngressos] = useState([
    { tipo: "Ingresso Individual", descricao: 'Acesso ao evento', preco: 70, quantidade: 0 },
    { tipo: "Mesa de até 4 pessoas", descricao: 'Reserva de mesa completa', preco: 250, quantidade: 0 }
  ])

  const [login, setLogin] = useState(false) //não está logado


  return (
    <div className={styles.wrapper}>

      <Steps step={1}/>

      <div className={styles.wrapper2}>

        <FormCadastro />

      </div>
      
    </div>
  )
}

export default index