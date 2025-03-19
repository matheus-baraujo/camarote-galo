'use client'

import styles from "./page.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Section1 from './(pages)/(carnaval)/_Home/section1'
import Section2 from './(pages)/(carnaval)/_Home/section2'
import Section3 from './(pages)/(carnaval)/_Home/section3'

import BackroundAssetsHome from './_components/(carnaval)/BackgroundAssetsHome'

import { useState } from "react";

export default function Home() {

  const [evento, setEvento] = useState("saojoao");

  return (

    evento == "carnaval" ?
      <>
        <div className={styles.topBar} ></div>

        <h1 style={{display:'none'}}>Camarote - Se Você Não For Eu Vou</h1>

        <Container fluid="sm" style={{position: 'relative', minHeight: '100vh'}}>
          
          <Section1 />
          <Section2 />
          <Section3 />

        </Container>

        <BackroundAssetsHome />

        <img className={styles.Waves} src="/assets/waves.png" alt="waves" />
      </>
    :
      <>
        <p>sao joao</p>
      </>
  );
}
