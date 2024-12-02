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

async function enviarEmail(email, codigo) {
  try {
      const url = `https://sevcnaoforeuvou.com.br/enviar_email.php?email=${encodeURIComponent(email)}&codigo=${encodeURIComponent(codigo)}`;
      
      const response = await fetch(url);
      
      if (response.ok) {
          const textoResposta = await response.text();
          console.log("email enviado com sucesso");
      } else {
          console.error("Erro ao realizar a requisição");
      }
  } catch (erro) {
      console.error("Erro na requisição");
  }
}


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

  async function fetchData() {
    const myHeaders = new Headers();
    const token = "Bearer "+process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    myHeaders.append("Authorization", token);
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
        const token = process.env.NEXT_PUBLIC_DB_URL;
        const url = token+`createCompra.php`;

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
          const updateCompraData = {apiKey, idPagamento, status, codigo};

          //console.log(updateCompraData)

          const url = token+`updateCompra.php`;

          //console.log(url)
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

            const url = `http://localhost/enviar_email.php?preference=${encodeURIComponent(idPreference)}&api_key=${encodeURIComponent(apiKey)}`;

            try {
              const response = fetch(url, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
      
              if (response.ok) {
                  const cliente =  response.json();
                  enviarEmail( cliente.email, codigo)
              } else {
                  const erro = response.json();
                  console.error("Erro:", erro.error || "Erro desconhecido");
              }
          } catch (erro) {
              console.error("Erro na requisição:", erro);
          }


            
          })
          .catch((error) => console.log('erro de atulalização'));

        })
        .catch((error) => console.log('erro no banco'));

      })
      .catch((error) => console.error('erro api - busca do pagamento'));
  }

  useEffect(async ()=>{
    fetchData()
  }, [])
  
  
  return (
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', display: 'flex'}}>
        <Row className={styles.info + ' px-3 px-md-5'}>
            <h1 className={styles.title}>Compra bem sucedida!</h1>
            <p> <span>{cod}</span> </p>
            <p>Orientamos que guarde este código.</p>
            <p>Você receberá uma cópia do código de recebimento do kit em seu email.</p>
            <p>Ou poderá acessar seus ingressos e códigos em:</p>

            <StyledButton texto={'Meus ingressos'} action={Ingressos} />
        </Row>
      </Container>
      <BackgroundAssets />
    </>
  );
}
