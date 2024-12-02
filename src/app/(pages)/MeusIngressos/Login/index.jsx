'use client'

import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

import styles from './styles.module.css'

import FormGroup from '../../../_components/FormGroup'
import StyledButton from '../../../_components/StyledButton'

const index = (props) => {

  const [data, setData] = useState([]);

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

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
    setEmailError('')
    setCpfError('')


    // Check if the user has entered fields correctly
    
    if ('' === email) {
      setEmailError('Campo vazio')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Email inválido')
      return
    }
    if ('' === cpf) {
      setCpfError('Campo vazio')
      return
    }
    if (cpf.length !== 14) {
      setCpfError('CPF inválido')
      return
    }

    

    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;
    
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
      var count = Object.keys(data).length / 4;
      //console.log(count)
      //console.log(cpf)
      //console.log(email)
      
      if(count == 1){
        if(data.cpf == cpf && data.email == email){
          //console.log('logado!!')
          props.lembrarCliente(data.nome, data.cpf, data.email)
          props.setLogin(true);
        }else{
          //console.log('credenciais incorretas')
          setCpfError('credenciais incorretas')
        }
      }else{
        setEmailError("registro não encontrado")
        //console.log("registro não encontrado")
      }
    })
    .catch((error) => console.log(error.message));


  }

  return (
    <Form className={styles.form}>
      <FormGroup type={1} valor={email}   setting={setEmail}    error={emailError}/>
      <FormGroup type={3} valor={cpf}     setting={alterarCpf}  error={cpfError}/>

      <StyledButton texto={'Acessar'} action={onButtonClick}/>

    </Form>
  )
}

export default index