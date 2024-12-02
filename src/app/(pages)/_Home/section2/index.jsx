import React from 'react'

import style from './styles.module.css'
import { Row, Col } from 'react-bootstrap';
import InfoAtracao from './InfoAtracao'

const index = () => {

  var content = [['A Alegria do Frevo: Patusco no Carnaval','Prepare-se para dançar com o tradicional bloco Patusco! Ritmo, energia e muito frevo para fazer a folia inesquecível! 🎭🎶'],
                  ['Paixão e Música: Faringes da Paixão no Palco','Deixe-se contagiar pelo som animado e irreverente da Faringes da Paixão! Uma atração que promete levantar a galera! 🎤🎉']]


  return (
    <Row className={style.section+' px-3 px-md-5'} style={{color:'#F4016A'}}>

      <h2 className={style.title}>Atrações</h2>

      <Row className={style.Atracao}>
        <Col xs={6}>
          <InfoAtracao title={content[1][0]} text={content[1][1]} />
        </Col>

        <Col xs={6} style={{position:'relative'}}>
          <img src="/assets/faringes.png" className={style.Atracao1} alt="faringes" />
        </Col>
      </Row>
    
      <Row className={style.Atracao}>

        <Col xs={6} style={{position:'relative'}}>
          <img src="/assets/patusco.png" className={style.Atracao2} alt="patusco" />
        </Col>

        <Col xs={6}>
          <InfoAtracao title={content[0][0]} text={content[0][1]} />
        </Col>

      </Row>
    
      <Row className={style.Atracao}>
        <Col xs={6} style={{textAlign:'center'}}>
          <InfoAtracao title={content[1][0]} text={content[1][1]} />
        </Col>

        <Col xs={6} style={{position:'relative'}}>
          <img src="/assets/faringes.png" className={style.Atracao1} alt="faringes" />
        </Col>
      </Row>

      <Col xs={6} className={''}>
        
      </Col>

      <Col xs={6} className={''}>

        <div className={''}>
          <img src="/assets/arrows.png" height={'auto'} width={'100%'} alt="arrows" />
        </div>
        
      </Col>
    </Row>
  )
}

export default index