'use client'

import styles from "./page.module.css";
import { useState } from "react";

import Container from 'react-bootstrap/Container';

import Login from './Login'
//import Logged from './Logged'
import { Button, Col, Row } from "react-bootstrap";
import { hashPassword2 } from "@/app/database/utilidades";

import BackgroundAssets from '../../_components/BackgroundAssets'
import StyledButton from '../../_components/StyledButton'

export default function Administrator() {

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)

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
      setEmailError('Please enter your login')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }


    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getAdmin.php?api_key=${apiKey}&login=${login}`;
    
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
          setLoggedIn(true)
        }else{
          console.log('senha incorreta')
        }
      }else{
        console.log("login não encontrado")
      }
    })
    .catch((error) => setError(error.message));
      
  };

  return (
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', alignContent:'center'}}>
        <Row className='px-3 px-md-5' style={{margin: 'auto'}}>
          <Col xs={12} md={6} style={{margin:'auto'}}>
            <h1 className={styles.title}>Admin</h1>
            {loggedIn ?   <Logged /> : <Login login={login} senha={password} loginError={emailError} senhaError={passwordError} setLogin={setLogin} setSenha={setPassword} logar={onButtonClick}/>}
          </Col>
        </Row>
        
        {loggedIn ?  <StyledButton texto={'Logout'} action={setLoggedIn(false)} /> : <></>}
      </Container>

      <BackgroundAssets />
    </>
  );
}
