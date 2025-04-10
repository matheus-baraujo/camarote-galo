'use client'

import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

import styles from './styles.module.css'

import { hashPassword2 } from '@/services/database'

const index = (props) => {
  const [data, setData] = useState([]);

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = async () => {
    // Set initial error values to empty
    setLoginError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === login) {
      setLoginError('Campo vazio')
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
    //console.log(url)
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
          //console.log('logado!!')
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
    <div className={styles.content}>
      <div className={styles.inputGroup}>
        <label>Login</label>
        <input type="text" placeholder="Usuário" value={login} onChange={(e) => setLogin(e.target.value)} />
        <label className={styles.erro}>{loginError}</label>
      </div>
      
      <div className={styles.inputGroup}>
        <div className={styles.passwordHeader}>
          <label>Senha</label>
        </div>
        <input type='password' placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label className={styles.erro}>{passwordError}</label>
      </div>

      <button className={styles.button} onClick={()=>onButtonClick()}>Acessar</button>
    </div>
  )
}

export default index