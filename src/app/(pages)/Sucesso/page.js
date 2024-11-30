'use client'

import styles from "./page.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useSearchParams } from 'next/navigation'
import { makeCod } from "@/app/database/utilidades";
import { useEffect, useState } from "react";

export default function Home() {

  const [cod,setCod] = useState('');
  

  const searchParams = useSearchParams()

  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')
  const paymentType = searchParams.get('payment_type')
  const preferenceId = searchParams.get('preference_id')
  
  // console.log(paymentId)
  // console.log(status)
  // console.log(paymentType)
  // console.log(preferenceId)

  useEffect(async ()=>{

    async function fetchData() {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer APP_USR-8863321753051093-112114-41a86e2093152d19ff5b839604fa15b9-2108742539");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const url = 'https://api.mercadopago.com/v1/payments/'+paymentId
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
        
          console.log(result)
      
          const codigo = makeCod()
        
          setCod(codigo)
        })
        .catch((error) => console.error(error));
    }

    fetchData()
  }, [])
  
  

  return (
    <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>
      <Row className='px-3 px-md-5' style={{margin: 'auto', width: '75%', textAlign:'center'}}>
          <h1 className={styles.title}>Compra bem sucedida!</h1>
          <p>{cod}</p>
          <p>Você receberá o código de recebimento do kit em seu email.</p>
          <p>Ou poderá acessar seus ingressos em:</p>
          <button style={{margin: 'auto', width: '50%', textAlign:'center'}}>Meus ingressos</button> 
      </Row>
    </Container>
  );
}
