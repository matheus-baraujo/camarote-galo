import styles from "./page.module.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Section1 from './(pages)/_Home/section1'

import Section2 from './(pages)/_Home/section2'

export default function Home() {

  return (
    <div style={{backgroundColor: 'rgba(224, 215, 223, 0.6)'}}>
      <div className={styles.topBar} ></div>

      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh'}}>
        
        <Section1 />
        <Section2 />
        

      </Container>
    </div>
  );
}
