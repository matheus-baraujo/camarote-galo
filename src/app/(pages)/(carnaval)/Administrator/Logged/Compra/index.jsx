'use client'
import React, { useEffect } from 'react'

import styles from './styles.module.css'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

const index = (props) => {

  const [given, setGiven] = useState(0);
  const [cod, setCod] = useState(0);
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
    //console.log(url)
    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data)=> {
        //console.log(result)
        var entregue = 1;
        setGiven(1);
        
        const apiKey = process.env.NEXT_PUBLIC_DB_API;

        let codigo = props.codigo;
        const updateCompraData = {apiKey, id, codigo, entregue};

        //console.log(updateCompraData)
        const url2 = process.env.NEXT_PUBLIC_DB_URL+`updateRecebimento.php`;
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
        .catch((error) => console.log('erro de atualização'));
      })
      .catch((error) => console.error(error));
  }

  useEffect(()=>{
    if(props.status != 'approved' || props.codigo == '' ||  props.codigo == null){
      setCod('*******')
      setButtonAllow(0)
    }else{
      setCod(props.codigo)

      if (props.recebimento == 0) {
        setButtonAllow(1)
      } else {
        setButtonAllow(0)
      }
    }
  }, [props])
  

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

      <div className={styles.Item +' '+styles.button} >

        {buttonAllow ? <Button onClick={() => checarStatus(props.id)}>Entregar</Button> : <Button disabled={true}>Entregue</Button>}
        
      </div>
      
    </div>
  )

}

export default index