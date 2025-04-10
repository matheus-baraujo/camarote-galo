'use client'

import styles from "./styles.module.css";
import { useState } from "react";

import Container from 'react-bootstrap/Container';

import Login from './Login'
import Logged from './Logged'
import {Col, Row } from "react-bootstrap";


const index = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  const deslogar = () =>{
    setLoggedIn(false)
  }
  
  return (
    <div className={styles.wrapper}>
      
          <div className={styles.wrapper2}>
            <h1 className={styles.title}>Admin</h1>
            {loggedIn ?   <Logged /> : <Login setLoggedIn={setLoggedIn} />}
          </div>

        {loggedIn ?  <><button className={styles.button} onClick={() => deslogar()}> Deslogar </button></> : <></>}

        

    </div>
  )
}

export default index