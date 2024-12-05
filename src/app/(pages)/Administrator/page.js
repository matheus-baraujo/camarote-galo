'use client'

import styles from "./page.module.css";
import { useState } from "react";

import Container from 'react-bootstrap/Container';

import Login from './Login'
import Logged from './Logged'
import {Col, Row } from "react-bootstrap";

import BackgroundAssets from '../../_components/BackgroundAssets'
import StyledButton from '../../_components/StyledButton'

export default function Administrator() {

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)

  const deslogar = () =>{
    setLoggedIn(false)
  }

  return (
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', alignContent:'center'}}>
        <Row className='px-3 px-md-5' style={{margin: 'auto auto 50px'}}>
          <Col xs={12} md={6} style={{margin:'auto'}}>
            <h1 className={styles.title}>Admin</h1>
            {loggedIn ?   <Logged /> : <Login setLoggedIn={setLoggedIn} />}
          </Col>
        </Row>

        {loggedIn ?  <StyledButton texto={'Logout'} action={deslogar} /> : <></>}

        
      </Container>

      <BackgroundAssets />
    </>
  );
}
