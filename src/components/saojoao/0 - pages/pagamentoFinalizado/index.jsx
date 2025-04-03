import React from 'react'
import styles from './styles.module.css'

import Steps from '@/components/saojoao/1 - others/steps'
import MensagemCompra from '@/components/saojoao/1 - others/mensagemCompra'
import DisplayTicket from '@/components/saojoao/1 - others/displayTicket'

const index = () => {
  return (
    <div className={styles.wrapper}> 

      <Steps step={3}/> 

      <div className={styles.wrapper2}>

        <div className={styles.title}><h3>Confirmação de compra</h3></div>

        <div className={styles.content}>
          <MensagemCompra />

          <DisplayTicket />

        </div>

      </div>

      <button onClick={()=> window.location.href = '/'}>Voltar para o inicio</button>
      
    </div>
  )
}

export default index