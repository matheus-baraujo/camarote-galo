'use client'
import React, { useEffect } from 'react'

import styles from './styles.module.css'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

import { makeCod } from "@/app/database/utilidades";

const index = (props) => {

  const [cod, setCod] = useState('');
  const [buttonAllow, setButtonAllow] = useState('');

  const checarStatus = async (id) => {
    const myHeaders = new Headers();
    const token = 'Bearer '+ process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const url = 'https://api.mercadopago.com/v1/payments/'+id;
    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data)=> {
        //console.log(result)
        var codigo = '';
        if(result.status == 'approved'){
          codigo = makeCod()
          setCod(codigo)
        }
        const status = result.status;
        const apiKey = process.env.NEXT_PUBLIC_DB_API;

        let idPagamento = id;
        const updateCompraData = {apiKey, idPagamento, status, codigo};

        //console.log(updateCompraData)
        const url2 = process.env.NEXT_PUBLIC_DB_URL+`updateCompra.php`;
        fetch(url2, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateCompraData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
          props.action();
        })
        .catch((error) => console.log('erro de atulalização'));
      })
      .catch((error) => console.error('erro api - busca do pagamento'));
  }

  useEffect(()=>{
    if(props.status != 'approved' || props.codigo == '' ||  props.codigo == null){
      setCod('*******')
      setButtonAllow(true)
    }else{
      setCod(props.codigo)
      setButtonAllow(false)
    }
  }, [props])
  

  return (
    <div className={styles.Card}>
      <div className={styles.Item}>
        <p>Ingressos</p>
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

      <div className={styles.Item +' '+styles.button} >

        {buttonAllow ? <Button onClick={() => checarStatus(props.id)}>Checar Pagamento</Button> : <Button disabled={true}>Checar Pagamento</Button>}
        
      </div>
      
    </div>
  )

}

export default index