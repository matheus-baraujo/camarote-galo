import React from 'react'

import style from './styles.module.css'
import { Row, Col } from 'react-bootstrap';

import Informacoes from '../../../1 - assets/Informacoes'
import Localizacao from '../../../1 - assets/Localizacao'
import OpenBar from './OpenBar'
import OpenFood from './OpenFood'


const index = () => {
  return (
    <div className={style.section+' px-3 px-md-5'}>
      <h2 className={style.title}>Detalhes</h2>

      <Row style={{margin:'30px 0px'}}>
        <OpenBar />
        <div className={style.containerCross} >
          <img src="/(carnaval)/assets/cross.png" className={style.Cross} alt="cross" />
        </div>
        
        <OpenFood />
      </Row>

      <Row>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', textAlign:'center'}}>
          
          <img src="/(carnaval)/assets/Date.png" width={'40%'} style={{margin:'auto'}} alt="data" />

          <Informacoes />

          <Localizacao />
        </div>
      </Row>

    </div>
  )
}

export default index