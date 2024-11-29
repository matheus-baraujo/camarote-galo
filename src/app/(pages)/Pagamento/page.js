'use client'

import { useState } from "react";

import styles from './page.module.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PaymentForm from '../../_components/PaymentForm'


export default function Pagamento() {

  //const teste = createPreference();
  //const teste2 = getAccessToken();

  // const [initPoint, setInitPoint] = useState(null);

  // const handlePayment = async () => {
  //   try {
  //     const url = await createPreference();
  //     setInitPoint(url); // Salva a URL para redirecionar ou abrir no checkout
  //   } catch (error) {
  //     console.error('Erro no pagamento:', error);
  //   }
  // };

  // console.log(initPoint)
  
  return (
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>
        <Row className='px-3 px-md-5' style={{margin: 'auto'}}>
            <h1 className={styles.title}>Compra Ingresso</h1>

            <PaymentForm />
        </Row>
      </Container>
  );
}
