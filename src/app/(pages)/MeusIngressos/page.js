'use client'

import { useEffect, useState } from "react";

import styles from './page.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Login from './Login'
import Logged from './Logged'
import { Button, Col } from "react-bootstrap";

import BackgroundAssets from '../../_components/BackgroundAssets'
import StyledButton from '../../_components/StyledButton'

export default function MeusIngressos() {

  const [loggedIn,setLoggedIn] = useState(false);
  
  const [cliente,setCliente] = useState('');
  const [clienteCpf,setClienteCpf] = useState('');
  const [clienteEmail,setClienteEmail] = useState('');
  const [clienteCep,setClienteCep] = useState('');
  const [clienteTelefone,setClienteTelefone] = useState('');

  const lembrarCliente = (nome, cpf, email, cep, telefone) =>{
    setCliente(nome);
    setClienteCpf(cpf);
    setClienteEmail(email);
    setClienteCep(cep);
    setClienteTelefone(telefone);
  }

  const deslogar = () =>{
    setCliente('');
    setClienteCpf('');
    setClienteEmail('');
    setLoggedIn(false)
  }

  return(
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', alignContent:'center'}}>
        <Row className='px-3 px-md-5' style={{margin: 'auto auto 50px'}}>
          <Col xs={12} md={6} style={{margin:'auto'}}>
            <h1 className={styles.title}>Meus Ingressos</h1>
            {loggedIn ?   <Logged cliente={cliente} clienteCpf={clienteCpf} clienteEmail={clienteEmail} clienteCep={clienteCep} clienteTelefone={clienteTelefone}/> 
              : 
              <Login setLogin={setLoggedIn} lembrarCliente={lembrarCliente}/>}
          </Col>
        </Row>

        {loggedIn ?  <StyledButton texto={'Logout'} action={deslogar} /> : <></>}

        
      </Container>

      <BackgroundAssets />
    </>
  );
}