'use client'

import { useState } from "react";

import styles from './page.module.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PaymentForm from './PaymentForm'
import PaymentForm2 from './PaymentForm2'
import BackgroundAssets from '../../_components/BackgroundAssets'

export default function Pagamento() {
  
  const [primeiraCompra, setPrimeiraCompra] = useState(0);

  return (
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>

        <Row className='px-3 px-md-5' style={{margin: 'auto'}}>
            <h1 className={styles.title}>Compra Ingresso</h1>


            {
              primeiraCompra == 0 ? 
                <div className={styles.selector}>
                  <div className={styles.option} onClick={()=> setPrimeiraCompra(1)}>
                    <p>Primeira Compra</p>
                  </div>

                  <div className={styles.option} onClick={()=> setPrimeiraCompra(2)}>
                    <p>Já possuo Cadastro</p>
                  </div>
                </div>
              :
                primeiraCompra == 1 ?
                  <PaymentForm />
                :
                  <PaymentForm2 />
            }
            
        </Row>

      </Container>

      <BackgroundAssets />
    </>
  );
}
