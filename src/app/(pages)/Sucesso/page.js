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
  const statusUrl = searchParams.get('status')
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
        
          //console.log(result)
      
          var codigo = '';
          if(result.status == 'approved'){
            codigo = makeCod()
            setCod(codigo)
          }
          
          const idPreference = preferenceId;
          const idPagamento = paymentId
          const status = result.status;
          // CREATE COMPRA
          const apiKey = 'minha_chave_secreta';
          const clienteData = {apiKey, idPreference, idPagamento, status};
          const url = `http://localhost/api/createCompra.php`;

          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`Erro: ${response.status}`);
              }
              return response.json();
          })
          .then((data) => {
            //console.log('compra criada com sucesso')

            // UPDATE COMPRA
            const apiKey = 'minha_chave_secreta';
            const updateCompraData = {apiKey, idPagamento, status, codigo};

            //console.log(updateCompraData)

            const url = `http://localhost/api/updateCompra.php`;

            fetch(url, {
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
              //console.log('compra atualizada com sucesso')
            })
            .catch((error) => console.log(error.message));

          })
          .catch((error) => console.log(error.message));

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
          <p>Orientamos que guarde este código.</p>
          <p>Você receberá uma cópia do código de recebimento do kit em seu email.</p>
          <p>Ou poderá acessar seus ingressos e códigos em:</p>
          <button style={{margin: 'auto', width: '50%', textAlign:'center'}}>Meus ingressos</button> 
      </Row>
    </Container>
  );
}
