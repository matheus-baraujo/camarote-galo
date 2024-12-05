'use client'

import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

import styles from './styles.module.css'

import FormGroup from '../../../_components/FormGroup'
import StyledButton from '../../../_components/StyledButton'

import { hashPassword2 } from '../../../database/utilidades'

const index = (props) => {
  const [data, setData] = useState([]);

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === login) {
      setEmailError('Campo vazio')
      return
    }

    if ('' === password) {
      setPasswordError('Campo vazio')
      return
    }

    if (password.length < 7) {
      setPasswordError('Senha Inválida')
      return
    }


    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getAdmin.php?api_key=${apiKey}&login=${login}`;
    console.log(url)
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      setData(data)
      if(data.length == 1){
        
        var senha = hashPassword2(data[0].salt, password)
        
        if(data[0].hash == senha){
          console.log('logado!!')
          props.setLoggedIn(true)
          console.log(props.loggedIn)
        }else{
          setPasswordError('Credenciais incorretas')
        }
      }else{
        setEmailError("login não encontrado")
      }
    })
    .catch((error) => console.log(error));
      
  };

  
  return (
    <Form className={styles.form}>
      <FormGroup type={6} valor={login}  setting={setLogin}    error={emailError}/>
      <FormGroup type={5} valor={password}  setting={setPassword}  error={passwordError}/>

      <StyledButton texto={'Acessar'} action={onButtonClick}/>

    </Form>
  )
}

export default index