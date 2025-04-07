'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'

import FormCadastro from './formCadastro'
import Steps from '@/components/saojoao/1 - others/steps'

import { usarContexto } from '@/context/contexto';

const index = () => {

  const { cliente, setCliente } = usarContexto();


  useEffect(() => {

    var ingressos = JSON.parse('[' + sessionStorage.getItem("tickets") + ']');

    
    if (2 != 2 && (ingressos == null || ingressos == false || ingressos == undefined)) {
      console.log('ok')
    }

    if(cliente != false && cliente != null && cliente != undefined && (ingressos == null || ingressos == false || ingressos == undefined)){
      window.location.href = '/Pagamento';
    }

  },[cliente]);

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