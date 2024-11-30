'use client'

import styles from "./page.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useSearchParams } from 'next/navigation'
import { makeCod } from "@/app/database/utilidades";
import { useEffect, useState } from "react";


export default function Erro() {

  const searchParams = useSearchParams()

  useEffect(()=>{
    
    const paymentId = searchParams.get('payment_id')
    const status = searchParams.get('status')
    const paymentType = searchParams.get('payment_type')
    const preferenceId = searchParams.get('preference_id')

    if (paymentId == null || status == null || paymentType == null || preferenceId == null) {
      console.log('invalid response')
    }else{
      console.log('valid response')
    }

  },[])
  

  return (
    <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>
      <Row className='px-3 px-md-5' style={{margin: 'auto', width: '75%', textAlign:'center'}}>
          <h1 className={styles.title}>Pagamento Pendente</h1>
          <p>Lamentamos que a validação do pagamento esteja pendente, você ainda poderá acessar seu cadastro no link abaixo e 
            averiguar o status de seu pagamento, recebendo seu código após confirmação do pagamento.</p>
          <button style={{margin: 'auto', width: '50%', textAlign:'center'}}>Meus ingressos</button> 
          <p>Em caso de dúvidas entre em contato com nossos organizadores.</p>
      </Row>
    </Container>
  );
}
