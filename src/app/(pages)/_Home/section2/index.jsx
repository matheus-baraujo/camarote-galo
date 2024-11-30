import React from 'react'

import style from './styles.module.css'
import { Row, Col } from 'react-bootstrap';

const index = () => {
  return (
    <Row className={style.section+' px-3 px-md-5'} style={{color:'#F4016A'}}>

      <h2 style={{textAlign:'center', margin:'100px 0px'}}>Atrações</h2>

      
      <Row style={{margin:'130px 0px'}}>
        <Col xs={6} style={{textAlign:'center'}}>
          <div style={{width:'50%', margin:'auto'}}>
            <h3>Titulo</h3>
            <p>facilisis efficitur. nisl. elit varius lorem. Quisque Nunc eu non elementum sapien nec diam facilisis Ut amet, nibh sit Sed </p>
          </div>
        </Col>

        <Col xs={6} style={{position:'relative'}}>
          <img src="/assets/faringes.png" style={{position:'absolute', top:'-540px', right:'-450px' , height:'1200px', width:'auto', zIndex:'2'}} className={''} alt="faringes" />
        </Col>
      </Row>
    
      <Row style={{margin:'130px 0px'}}>

        <Col xs={6} style={{position:'relative'}}>
          <img src="/assets/patusco.png" style={{position:'absolute', top:'-350px', left:'-370px' , height:'900px', width:'auto', zIndex:'2'}} className={''} alt="faringes" />

          <img src="/assets/Points.png" className={style.points2} alt="logo" />
        </Col>

        <Col xs={6} style={{textAlign:'center'}}>
          <div style={{width:'50%', margin:'auto'}}>
            <h3>Titulo</h3>
            <p>facilisis efficitur. nisl. elit varius lorem. Quisque Nunc eu non elementum sapien nec diam facilisis Ut amet, nibh sit Sed </p>
          </div>
        </Col>

      </Row>
    
      <Row style={{margin:'130px 0px'}}>
        <Col xs={6} style={{textAlign:'center'}}>
          <div style={{width:'50%', margin:'auto'}}>
            <h3>Titulo</h3>
            <p>facilisis efficitur. nisl. elit varius lorem. Quisque Nunc eu non elementum sapien nec diam facilisis Ut amet, nibh sit Sed </p>
          </div>
        </Col>

        <Col xs={6} style={{position:'relative'}}>
          <img src="/assets/faringes.png" style={{position:'absolute', top:'-540px', right:'-450px' , height:'1200px', width:'auto', zIndex:'2'}} className={''} alt="faringes" />
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