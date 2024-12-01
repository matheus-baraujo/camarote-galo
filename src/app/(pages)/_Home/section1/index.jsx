'use client'

import React from 'react'

import style from './styles.module.css'
import { Row, Col, Button } from 'react-bootstrap';


const Pagamento = () => {
  window.location.href = '/Pagamento';
}

const Ingressos = () => {
  window.location.href = '/MeusIngressos';
}


const index = () => {
  return (
    <Row className={style.section+' px-3 px-md-5'} >

      <Col xs={12} md={6} className={style.leftSide}>
        <img src="/assets/Logo.png" className={style.logo} alt="logo" />
        <img src="/assets/Points.png" className={style.points} alt="logo" />
      </Col>

      <Col xs={12}  md={6} className={style.rightSide}>

        <img src="/assets/selo18anos.png" className={style.selo} alt="selo" />
        <div className={style.buttons}>
          <Button className={style.button +' '+ style.button2} onClick={Pagamento}>Garanta já seu ingresso !!</Button>
          <Button className={style.button +' '+ style.button3} onClick={Ingressos}>Meu ingressos</Button>
          <img src="/assets/arrows.png" height={'auto'} width={'100%'} alt="arrows" />
        </div>
        
      </Col>
    </Row>
  )
}

export default index