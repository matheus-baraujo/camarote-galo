import React from 'react'

import style from './styles.module.css'
import { Row, Col } from 'react-bootstrap';

import Informacoes from '../../../_components/Informacoes'
import Localizacao from '../../../_components/Localizacao'
import OpenBar from './OpenBar'
import OpenFood from './OpenFood'


const index = () => {
  return (
    <div className={style.section+' px-3 px-md-5'}>
      <h2 className={style.title}>Detalhes</h2>

      <Row style={{margin:'30px 0px'}}>
        <OpenBar />
        <OpenFood />
      </Row>

      <Row>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'center'}}>
          
          <img src="/assets/Date.png" width={'40%'} style={{margin:'auto'}} alt="" />

          <Informacoes />

          <Localizacao />
        </div>
      </Row>

    </div>
  )
}

export default index