'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'

import FormCadastro from './formCadastro'
import Steps from '@/components/saojoao/1 - others/steps'

import { usarContexto } from '@/context/contexto';

const index = () => {

  const { cliente, setCliente } = usarContexto();

  useEffect(() => {
    if(cliente != false && cliente != null && cliente != undefined){
      window.location.href = '/Pagamento';
    }
  },[cliente]);

  const [ingressos, setIngressos] = useState([
    { tipo: "Ingresso Individual", descricao: 'Acesso ao evento', preco: 70, quantidade: 0 },
    { tipo: "Mesa de até 4 pessoas", descricao: 'Reserva de mesa completa', preco: 250, quantidade: 0 }
  ])




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