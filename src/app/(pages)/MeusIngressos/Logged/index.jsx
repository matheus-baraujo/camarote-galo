'use client'

import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

import Compra from './Compra'

const index = (props) => {

  const [data, setData] = useState([]);

  async function fetchData(){
    // URL do endpoint com a chave de API
    const apiKey = 'minha_chave_secreta';
    
    const url = `http://localhost/api/getComprasCliente.php?api_key=${apiKey}&cpf=${props.clienteCpf}`;
    
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
        <Col xs={12}>
          <div>
            <p>Cliente: {props.cliente}</p>
            <p>CPF: {props.clienteCpf}</p>
            <p>Email: {props.clienteEmail}</p>
          </div>

          {
            data.map((item) =>{
              return(
                <Compra codigo={item.codigoRecebimento} id={item.idPagamento} status={item.status} quant={item.quant}/>
              )
            })
          }

        </Col>
      </Row>

      
    </>
  )
}

export default index