'use client'

import { useState } from "react";

import styles from './page.module.css'
import { Container, Row, Col } from "react-bootstrap";
import BackgroundAssetsGallery from '../../_components/BackgroundAssetsGallery'


import Gallery from './Gallery'
import Selector from './Selector'
import VideoCarousel from './VideoCarousel'

const landscape = {w: 1200, h: 775}
const portrait = {w: 775, h: 1200}
const square = {w: 1200, h: 1200}

var ano24 ={nome:'2024', fotos:['','','','','','','','h','h','',
                                '','h','','','','h','','','','',
                                '','h','h','','','','','','','',
                                '','','','','','','']}

var ano20 ={nome:'2020', fotos:['','','h','','','','','','','',
                                '','','','','','','','','','',
                                '','','','','','','','','','',
                                '','','','','','','','','','h',
                                '','']}

var ano19 ={nome:'2019', fotos:['','','','','','','','','','',
                                '','','','','','','','','','',
                                '','','h','','','','']}

var ano18 ={nome:'2018', fotos:['','','','','','','','','','',
                                '','','','','','','','','','',
                                '','','','']}

var ano17 ={nome:'2017', fotos:['','','','','','','','','','',
                                '','','','','','','','','','',
                                '','','','','','','','','','',
                                '','','','','','','','']}

var ano16 ={nome:'2016', fotos:['','h','','','','','h','','','',
                                '','','','','','','','','','',
                                '','']}

var outros ={nome:'outros', fotos:['h','h','','h','s','s','','','h','',
                                   'h','h','','h','h','h','h','','h','',
                                   'h','h','h','','','h','','']}

const anos = [outros, ano16, ano17, ano18, ano19, ano20, ano24]

var photosFinal = []

anos.map((ano) => {
  var aux = []
  var aux2 = 1;
  ano.fotos.map((foto)=>{
    let source = '/fotos/'+ano.nome+'/fotos ('+aux2+').webp'
    if(foto=='h'){
      aux.push({ src: source, width: portrait.w, height: portrait.h})
    }else if(foto=='s'){
      aux.push({ src: source, width: square.w, height: square.h})
    }else{
      aux.push({ src: source, width: landscape.w, height: landscape.h })
    }
    aux2 += 1;
  })
  photosFinal.push(aux)
})


const seletor = [['2024', photosFinal[6]],
                 ['2020', photosFinal[5]],
                 ['2019', photosFinal[4]],
                 ['2018', photosFinal[3]],
                 ['2017', photosFinal[2]],
                 ['2016', photosFinal[1]],
                 ['Outros', photosFinal[0]],
                 ['Videos', 'video']
                ]


export default function Galeria() {

  const [ fotos, setFotos] = useState(photosFinal[6])

  return(
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh'}}>

        

        <Row style={{margin: '0px auto'}}>
          <Col xs={12} md={6} style={{margin:'auto', position:'relative'}}>
            <button className={styles.voltar} onClick={() => {window.location.href = '/'}}>Voltar</button>
            <h1 className={styles.title}>Galeria</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6} style={{margin:'auto', paddingBottom:'30px'}}>

            <Selector action={setFotos} seletor={seletor} />

            {fotos != 'video' ? <Gallery imagens={fotos}/> : <VideoCarousel />}
            
          </Col>
        </Row>

      </Container>

      <BackgroundAssetsGallery />
    </>
  );
}