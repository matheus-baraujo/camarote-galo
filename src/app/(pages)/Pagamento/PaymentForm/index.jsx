'use client'

import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'
import FormGroup from '../../../_components/FormGroup'
import { Button } from 'react-bootstrap';

const index = () => {

  //cliente
  const [nome, setNome] = useState('')
  const [nomeError, setNomeError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  
  const [email2, setEmail2] = useState('')
  const [emailError2, setEmailError2] = useState('')

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
    setNomeError('')
    setEmailError('')
    setEmailError2('')
    setCpfError('')


    // Check if the user has entered fields correctly
    if ('' === nome) {
      setNomeError('Please enter your name')
      return
    }
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
    if ('' === email2) {
      setEmailError2('Please enter your email')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email2)) {
      setEmailError2('Please enter a valid email')
      return
    }
    if (email != email2){
      setEmailError2('Your email must be the same')
      return
    }
    if ('' === cpf) {
      setCpfError('Please enter your cpf')
      return
    }
    if (cpf.length !== 14) {
      setCpfError('invalid cpf')
      return
    }
    
    // CREATE CLIENTE
    const apiKey = 'minha_chave_secreta';
    const clienteData = {apiKey, nome, email, cpf};
    const url = `http://localhost/api/createCliente.php`;
    
    await fetch(url, {
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
      //console.log(data)

      //create preference
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer APP_USR-8863321753051093-112114-41a86e2093152d19ff5b839604fa15b9-2108742539");
      const raw = JSON.stringify({
        "auto_return": "approved",
        "back_urls": {
          "success": "http://localhost:3000/Successo",
          "failure": "http://localhost:3000/Erro",
          "pending": "http://localhost:3000/Erro"
        },
        "statement_descriptor": "Camarote - Se Voce Nao For Eu Vou",
        "items": [
          {
            "id": "010983098",
            "title": "Ingresso",
            "quantity": quant,
            "unit_price": 1000,
            "description": "Ingresso + kit(Camisa, Caneca, Pulseira)"
          }
        ],
        "payer": {
          "email": email,
          "name": nome
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
        .then((result) => {

          setInitPoint(result.init_point)

          // console.log(cpf)
          // console.log(result)
          // console.log(result.id)
          // console.log(result.init_point)

          var idPreference = result.id;
          var link = result.init_point;

          //console.log(idPreference)
          const apiKey = 'minha_chave_secreta';
          const preferenceData = {apiKey, idPreference, cpf, quant};

          console.log(preferenceData)
          console.log(clienteData)
          const url2 = `http://localhost/api/createPreference.php`;

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
            // console.log(initPoint)
            window.location.replace(initPoint)
          })
          .catch((error) => console.error(error.message));
        })
        .catch((error) => console.error(error.message));
      })
      .catch((error) => console.log(error.message));

  };

  return (
    <Form>
      <FormGroup type={0} valor={nome}    setting={setNome}     error={nomeError}/>
      <FormGroup type={1} valor={email}   setting={setEmail}    error={emailError}/>
      <FormGroup type={2} valor={email2}  setting={setEmail2}   error={emailError2}/>
      <FormGroup type={3} valor={cpf}     setting={alterarCpf}  error={cpfError}/>
      <FormGroup type={4} valor={quant}   setting={setQuant}    error={quantError}/>

      <Button 
        onClick={onButtonClick} 
        style={{width: '50%', margin: 'auto 25%'}}>
        Pagar
      </Button>

    </Form>
  )
}

export default index