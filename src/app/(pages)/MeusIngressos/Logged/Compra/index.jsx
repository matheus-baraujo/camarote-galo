'use client'
import React, { useEffect } from 'react'

import styles from './styles.module.css'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

const index = (props) => {

  const [cod, setCod] = useState('');
  const [buttonAllow, setButtonAllow] = useState('');

  useEffect(()=>{
    if(props.status != 'approved' || props.codigo == '' ||  props.codigo == null){
      setCod('*******')
      setButtonAllow(true)
    }else{
      setCod(props.codigo)
      setButtonAllow(false)
    }
  }, [cod])
  

  return (
    <div className={styles.Card}>
      <div className={styles.Item}>
        <p>Quant</p>
        <p className={styles.Valor}>{props.quant}</p>
      </div>

      <div className={styles.Item}>
        <p>Status Pagamento</p>
        <p className={styles.Valor}>{props.status}</p>
      </div>

      <div className={styles.Item}>
        <p>Código</p>
        <p className={styles.Valor}>{cod}</p>
      </div>

      <div className={styles.Item} style={{width:'25%'}}>

        {buttonAllow ? <Button>Checar Pagamento</Button> : <Button disabled={true}>Checar Pagamento</Button>}
        
      </div>
      
    </div>
  )
}

export default index