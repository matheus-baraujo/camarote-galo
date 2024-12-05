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

export default function Home() {

  const [cod,setCod] = useState('');
  
  useEffect(async ()=>{

    function getAllUrlParams(url) {

      // get query string from url (optional) or window
      var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    
      // we'll store the parameters here
      var obj = {};
    
      // if query string exists
      if (queryString) {
    
        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];
    
        // split our query string into its component parts
        var arr = queryString.split('&');
    
        for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split('=');
    
          // set parameter name and value (use 'true' if empty)
          var paramName = a[0];
          var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
    
          // (optional) keep case consistent
          paramName = paramName.toLowerCase();
          if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
    
          // if the paramName ends with square brackets, e.g. colors[] or colors[2]
          if (paramName.match(/\[(\d+)?\]$/)) {
    
            // create key if it doesn't exist
            var key = paramName.replace(/\[(\d+)?\]/, '');
            if (!obj[key]) obj[key] = [];
    
            // if it's an indexed array e.g. colors[2]
            if (paramName.match(/\[\d+\]$/)) {
              // get the index value and add the entry at the appropriate position
              var index = /\[(\d+)\]/.exec(paramName)[1];
              obj[key][index] = paramValue;
            } else {
              // otherwise add the value to the end of the array
              obj[key].push(paramValue);
            }
          } else {
            // we're dealing with a string
            if (!obj[paramName]) {
              // if it doesn't exist, create property
              obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === 'string'){
              // if property does exist and it's a string, convert it to an array
              obj[paramName] = [obj[paramName]];
              obj[paramName].push(paramValue);
            } else {
              // otherwise add the property
              obj[paramName].push(paramValue);
            }
          }
        }
      }
    
      return obj;
    }

    // const searchParams = useSearchParams()

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

    const paymentId = getAllUrlParams().payment_id;
    const statusUrl = getAllUrlParams().status;
    const paymentType = getAllUrlParams().payment_type;
    const preferenceId = getAllUrlParams().preference_id;
    
    // console.log(paymentId)
    // console.log(statusUrl)
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
        
          console.log(result)
      
          var codigo = '';
          if(result.status == 'approved'){
            codigo = makeCod()
            setCod(codigo)
          }
          
          const idPreference = preferenceId;
          const idPagamento = paymentId
          const status = result.status;
          // CREATE COMPRA
          const apiKey = process.env.NEXT_PUBLIC_DB_API;
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
