'use client'

import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

import Compra from './Compra'
import styles from './styles.module.css'

const index = (props) => {

  const [data, setData] = useState([]);

  async function fetchData(){
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getComprasCliente.php?api_key=${apiKey}&cpf=${props.clienteCpf}`;
    
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      setData(data)
      //console.log(data)
      
    })
    .catch((error) => console.log(error.message));
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
      <Row style={{margin:'auto'}}>
        <Col xs={12} style={{padding: 0}}>
          <div className={styles.clientInfo}>
            <label className={styles.label} htmlFor="cliente">Cliente</label>
            <p id='cliente'> {props.cliente}</p>

            <label className={styles.label} htmlFor="cpf">CPF</label>
            <p id='cpf'>{props.clienteCpf}</p>

            <label className={styles.label} htmlFor="email">Email</label>
            <p id='email'>{props.clienteEmail}</p>

            <label className={styles.label} htmlFor="cep">Cep</label>
            <p id='cep'>{props.clienteCep}</p>

            <label className={styles.label} htmlFor="tel">Telefone</label>
            <p id='tel'>{props.clienteTelefone}</p>
          </div>

          {
            data.map((item) =>{
              return(
                <Compra key={item.id} codigo={item.codigoRecebimento} id={item.idPagamento} status={item.status} quant={item.quant} action={fetchData}/>
              )
            })
          }

        </Col>
      </Row>
    </>
  )
}

export default index