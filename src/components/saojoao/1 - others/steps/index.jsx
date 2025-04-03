import React from 'react'
import styles from './styles.module.css'

import Step from './step'

const index = ({step}) => {
  
  var steps = [{text: "Ingressos", state: 0},{text: "Dados", state: 0},{text: "Pagamento", state: 0},{text: "Confirmação", state: 0}];

  for (let i = 0; i < 4; i++) {
    if (i<step) {
      steps[i].state = 0;
    }
    if (i==step) {
      steps[i].state = 1;
    }
    if (i>step) {
      steps[i].state = 2;
    }
  }

  
  return (
    <div className={styles.wrapper}>

      {
        steps.map((item, index) => {
          return(
            <>
              <Step number={index} text={item.text} state={item.state}/>

              {index != 3 ? <div className={styles.divider}></div> : <></>}
            </>
          )})
      }


    </div>
  )
}

export default index