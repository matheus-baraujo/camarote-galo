'use client'

import styles from "./page.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useSearchParams } from 'next/navigation'
import { makeCod } from "@/app/database/utilidades";
import { useEffect, useState } from "react";

import BackgroundAssets from '../../_components/BackgroundAssets'
import StyledButton from '../../_components/StyledButton'

const Ingressos = () => {
  window.location.href = '/MeusIngressos';
}  

export default function Erro() {

  

  useEffect(()=>{
    const searchParams = useSearchParams()
    
    const paymentId = searchParams.get('payment_id')
    const status = searchParams.get('status')
    const paymentType = searchParams.get('payment_type')
    const preferenceId = searchParams.get('preference_id')

    if (paymentId == null || status == null || paymentType == null || preferenceId == null) {
      console.log('acesso indevido')
    }else{
      console.log('valid response')
    }

  },[])
  

  return (

    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>
        <Row className={styles.info + ' px-3 px-md-5'}>
            <h1 className={styles.title}>Pagamento Pendente</h1>
            <p style={{marginBottom:'20px'}}>Lamentamos que a validação do pagamento esteja pendente, você ainda poderá acessar seu cadastro no link abaixo e 
              averiguar o status de seu pagamento, recebendo seu código após confirmação do pagamento.</p>
            <StyledButton texto={'Meus ingressos'} action={Ingressos} />
            <p style={{marginTop:'20px'}}>Em caso de dúvidas entre em contato com nossos organizadores.</p>
        </Row>
      </Container>
      <BackgroundAssets />
    </>
  );
}
