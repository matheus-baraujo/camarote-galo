'use client'

import { useEffect, useState } from "react";

import styles from './page.module.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PaymentForm from './PaymentForm'
import BackgroundAssets from '../../_components/BackgroundAssets'

export default function Pagamento() {
  
  return (
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>

        <Row className='px-3 px-md-5' style={{margin: 'auto'}}>
            <h1 className={styles.title}>Compra Ingresso</h1>
            <PaymentForm />
        </Row>

      </Container>

      <BackgroundAssets />
    </>
  );
}
