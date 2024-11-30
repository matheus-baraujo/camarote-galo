'use client'

import { useEffect, useState } from "react";

import styles from './page.module.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PaymentForm from '../../_components/PaymentForm'


export default function Pagamento() {

  const handlePayment = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer APP_USR-8863321753051093-112114-41a86e2093152d19ff5b839604fa15b9-2108742539");

    const raw = JSON.stringify({
      "auto_return": "approved",
      "back_urls": {
        "success": "http://localhost:3000/Sucesso",
        "failure": "http://localhost:3000/Erro",
        "pending": "http://localhost:3000/Erro"
      },
      "statement_descriptor": "Camarote - Se Voce Nao For Eu Vou",
      "items": [
        {
          "id": "010983098",
          "title": "Ingresso",
          "quantity": 1,
          "unit_price": 2000,
          "description": "Ingresso + kit(Camisa, Caneca, Pulseira)"
        }
      ],
      "payer": {
        "email": "test_user_12398378192@testuser.com",
        "name": "Juan"
      },
      "payment_methods": {
        "excluded_payment_types": [{ id: "ticket" },],
        "excluded_payment_methods": [{ id: "bolbradesco" },],
        "installments": 1
      },
      "notification_url": "https://www.your-site.com/webhook",
      "expires": true,
      "expiration_date_from": "2024-01-01T12:00:00.000-04:00",
      "expiration_date_to": "2024-12-31T12:00:00.000-04:00"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    console.log(raw)

    fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result.sandbox_init_point))
      .catch((error) => console.error(error));

  };
  
  return (
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>
        <Row className='px-3 px-md-5' style={{margin: 'auto'}}>
            <h1 className={styles.title}>Compra Ingresso</h1>
            {/* <button onClick={handlePayment}>teste</button> */}

            <PaymentForm />
        </Row>
      </Container>
  );
}
