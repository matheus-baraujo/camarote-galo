import styles from "./page.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Section1 from './(pages)/_Home/section1'
import Section2 from './(pages)/_Home/section2'
import Section3 from './(pages)/_Home/section3'

import BackroundAssetsHome from './_components/BackgroundAssetsHome'

export default function Home() {

  return (
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
  );
}
