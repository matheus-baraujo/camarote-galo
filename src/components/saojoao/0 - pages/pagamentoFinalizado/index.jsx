'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'


import { getCompraClient } from '@/services/api.js'

import Steps from '@/components/saojoao/1 - others/steps'
import MensagemCompra from '@/components/saojoao/1 - others/mensagemCompra'
import DisplayTicket from '@/components/saojoao/1 - others/displayTicket'

const index = () => {

  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('payment_id');

    if (!id || id == "null") {
      window.location.href = '/';
    }

    async function getCompra(id) {
      const data = await getCompraClient(id);
      setTicket(data[0]);
    }

    getCompra(id);
      
  }, []);


  return (
    <div className={styles.wrapper}> 

      <Steps step={3}/> 

      <div className={styles.wrapper2}>

        <div className={styles.title}><h3>Confirmação de compra</h3></div>

        <div className={styles.content}>
          
          <MensagemCompra ticket={ticket} />

          <DisplayTicket ticket={ticket} />

        </div>

      </div>

      <button onClick={()=> window.location.href = '/'}>Voltar para o inicio</button>
      
    </div>
  )
}

export default index