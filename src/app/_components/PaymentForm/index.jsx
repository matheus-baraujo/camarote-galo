'use client'

import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'
import FormGroup from './FormGroup'
import { Button } from 'react-bootstrap';

const index = () => {

  const [nome, setNome] = useState('')
  const [nomeError, setNomeError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  
  const [email2, setEmail2] = useState('')
  const [emailError2, setEmailError2] = useState('')

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  const [quant, setQuant] = useState('')
  const [quantError, setQuantError] = useState('')

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
    console.log(cpf)
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


    // URL do endpoint com a chave de API
    const apiKey = 'minha_chave_secreta';
    
    const clienteData = {apiKey, nome, email, cpf };

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
      console.log(data)
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