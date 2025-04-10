'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

import NumeroContato from './numeroContato'

const index = () => {

  const [ urlHome, setUrlHome ] = useState(true)

  useEffect(() => {
    var url = window.location.href;
    if(url != process.env.NEXT_PUBLIC_DB_URL_RETURN){
      setUrlHome(false)
    }
  },[]);

  return (
    <>
      {urlHome ? 
        <div className={styles.wrapper}>

          <img src="/saojoao/assets/patrocinador.webp" alt="patrocinador" />

          <div className={styles.wrapper2}>

              <h1 className={styles.title}>Contatos</h1>

              <h3>Dúvidas? Entre em contato conosco no WhatsApp!</h3>

              <div className={styles.wrapper3}>
                <NumeroContato number={"9969-6830"}/>
                <NumeroContato number={"9929-7718"}/>
              </div>

          </div>

          <img src="/saojoao/assets/patrocinador.webp" alt="patrocinador" />

        </div>

        :

        <>
          <div className={styles.wrapper4}>

            <h2 className={styles.creditos}>2025 São João do Se você não for eu vou</h2>

          </div>
        </>
      }
    </>
  )
}

export default index