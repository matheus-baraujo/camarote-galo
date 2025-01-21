'use client'

require('dotenv').config()

import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'
import FormGroup from '../../../_components/FormGroup'
import StyledButton from '../../../_components/StyledButton'

import { hashPassword2 } from '@/app/database/utilidades';

const index = () => {

  //cliente

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  const [quant, setQuant] = useState(1)
  const [quantError, setQuantError] = useState('')


  //pagamento
  const [initPoint, setInitPoint] = useState(null);

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  const alterarCpf = (value) => {
    value = cpfMask(value)
    setCpf(value)
    //console.log(cpf)
  }

  const onButtonClick = async () => {
    // Set initial error values to empty
    setCpfError('')
    setPasswordError('')
    setQuantError('')

    
    if ('' === cpf) {
      setCpfError('Campo vazio')
      return
    }
    if (cpf.length !== 14) {
      setCpfError('CPF inválido')
      return
    }
    if ('' === password) {
      setPasswordError('Campo vazio')
      return
    }
    if (password.length < 6) {
      setPasswordError('Senha deve ter 6 ou mais caracteres')
      return
    }
    
    
    // checando cliente
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const urlCheck = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;
    
    await fetch(urlCheck)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      var count = Object.keys(data).length / 8;
      
      if(count == 1){
        //console.log(count)
        var hash = hashPassword2(data.salt, password)

        if (data.cpf == cpf && data.senha == hash) {
          
          const token = "Bearer "+process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          //create preference
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const raw = JSON.stringify({
            "auto_return": "approved",
            "back_urls": {
              "success": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Sucesso",
              "failure": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Erro",
              "pending": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Erro"
            },
            "statement_descriptor": "Camarote - Se Voce Nao For Eu Vou",
            "items": [
              {
                "id": "010983098",
                "title": "Ingresso - Se você não for eu vou",
                "quantity": quant,
                "unit_price": 340,
                "description": "Ingresso + kit(Camisa, Caneca, Pulseira)"
              }
            ],
            "payer": {
              "email": data.email,
              "name": data.nome
            },
            "payment_methods": {
              "excluded_payment_types": [{ id: "ticket" },],
              "excluded_payment_methods": [{ id: "bolbradesco" },],
              "installments": 1
            },
            "notification_url": process.env.NEXT_PUBLIC_DB_URL+"notification.php",
            "external_reference": cpf,
            "expires": false
          });
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          //console.log(raw)

          fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
            .then((response) => response.json())
            .then((result) => {

              setInitPoint(result.init_point)

              var idPreference = result.id;
              //const link = result.init_point;
              const link = result.init_point;

              //console.log(idPreference)
              const apiKey = process.env.NEXT_PUBLIC_DB_API;
              const preferenceData = {apiKey, idPreference, cpf, quant};

              //console.log(preferenceData)
              //console.log(clienteData)
              const url2 = process.env.NEXT_PUBLIC_DB_URL+`createPreference.php`;

              fetch(url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferenceData),
              })
              .then((response) => {
                  if (!response.ok) {
                      throw new Error(`Erro: ${response.status}`);
                  }
                  return response.json();
              })
              .then((data) => {
                // console.log(data)
                // console.log('consegui cadastrar cliente e preference')
                // console.log(link)
                window.location.href = link;
              })
              .catch((error) => console.error('erro cadastro preferencia'));
            })
            .catch((error) => console.error('erro api mercado pago'));

        }else{
          setPasswordError('Credenciais incorretas')
          return
        }
      }else{
        setPasswordError('Credenciais incorretas')
        return
      }
    })
    .catch((error) => {console.log(error.message)});


  };

  return (
    <Form className={styles.Container}>

      <FormGroup type={3} valor={cpf}     setting={alterarCpf}  error={cpfError}/>
      <FormGroup type={5} valor={password}   setting={setPassword}    error={passwordError}/>
      <FormGroup type={4} valor={quant}   setting={setQuant}    error={quantError}/>

      <StyledButton texto={'Pagar'} action={onButtonClick} />

    </Form>
  )
}

export default index