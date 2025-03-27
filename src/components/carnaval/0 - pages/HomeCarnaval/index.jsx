import React from 'react'

import Container from 'react-bootstrap/Container';

import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";

import BackgroundAssetsHome from "../../1 - assets/BackgroundAssetsHome";

import styles from './styles.module.css'

const index = () => {
  return (
    <>
        <div className={styles.topBar} ></div>

        <h1 style={{display:'none'}}>Camarote - Se Você Não For Eu Vou</h1>

        <Container fluid="sm" style={{position: 'relative', minHeight: '100vh'}}>
          
          <Section1 />
          <Section2 />
          <Section3 />

        </Container>

        <BackgroundAssetsHome />

        <img className={styles.Waves} src="/(carnaval)/assets/waves.png" alt="waves" />
      </>
  )
}

export default index