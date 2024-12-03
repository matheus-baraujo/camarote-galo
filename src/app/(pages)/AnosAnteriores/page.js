'use client'

import { useEffect, useState } from "react";

import styles from './page.module.css'
import { Container, Row, Col } from "react-bootstrap";
import BackgroundAssets from '../../_components/BackgroundAssets'
import StyledButton from '../../_components/StyledButton'


import Gallery from './Gallery'
import Selector from './Selector'

const landscape = {w: 1200, h: 775}
const portrait = {w: 775, h: 1200}

const photos = [
  { src: "/fotos/foto1.JPG", width: landscape.w, height: landscape.h },
  { src: "/fotos/foto2.JPG", width: portrait.w, height: portrait.h },
  { src: "/fotos/foto3.JPG", width: landscape.w, height: landscape.h },
  { src: "/fotos/foto4.JPG", width: portrait.w, height: portrait.h },
  { src: "/fotos/foto5.JPG", width: landscape.w, height: landscape.h },
  { src: "/fotos/foto6.JPG", width: landscape.w, height: landscape.h },
];

const photos2 = [
  { src: "/fotos/foto1.JPG", width: portrait.w, height: portrait.h },
  { src: "/fotos/foto2.JPG", width: landscape.w, height: landscape.h },
  { src: "/fotos/foto3.JPG", width: landscape.w, height: landscape.h },
  { src: "/fotos/foto4.JPG", width: portrait.w, height: portrait.h },
  { src: "/fotos/foto5.JPG", width: landscape.w, height: landscape.h },
  { src: "/fotos/foto6.JPG", width: portrait.w, height: portrait.h },
];

const seletor = [['Início', photos], ['2016', photos2], ['2017', photos2], ['2018', photos2], ['2019', photos2], ['2020', photos2], ['2024', photos2]]


export default function AnosAnteriores() {

  const [ fotos, setFotos] = useState(photos)

  return(
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh'}}>
        <Row style={{margin: '0px auto'}}>
          <Col xs={12} md={6} style={{margin:'auto'}}>
            <h1 className={styles.title}>Anos Anteriores</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6} style={{margin:'auto'}}>

            <Selector action={setFotos} seletor={seletor} />
            <Gallery imagens={fotos}/>
            
          </Col>
        </Row>

      </Container>

      <BackgroundAssets />
    </>
  );
}