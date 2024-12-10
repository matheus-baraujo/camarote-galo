'use client'

import React from 'react'

import style from './styles.module.css'
import { Row, Col, Button } from 'react-bootstrap';


const index = () => {
  return (
    <Row className={style.section+' px-3 px-md-5'} >

      <Col xs={12} md={6} className={style.leftSide}>
        <img src="/assets/Logo.png" className={style.logo} alt="logo" />
      </Col>

      <Col xs={12}  md={6} className={style.rightSide}>

        <img src="/assets/banner.jpg" className={style.banner} alt="banner" />
        <div className={style.buttons}>
          <a href='/Pagamento' className={style.button +' '+ style.button2} >Garanta já seu ingresso !!</a>
          <a href='/MeusIngressos' className={style.button +' '+ style.button3} >Meus ingressos</a>
          <a href='/Galeria' className={style.button +' '+ style.button3} >Galeria</a>
          <img src="/assets/arrows.png" height={'auto'} width={'100%'} alt="arrows" />
        </div>
        
      </Col>
    </Row>
  )
}

export default index