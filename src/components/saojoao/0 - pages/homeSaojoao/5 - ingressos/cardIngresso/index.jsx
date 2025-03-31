import React from 'react'
import styles from './styles.module.css'


var ingressos = [[ "Ingresso Individual", 'Acesso ao evento' , '70,00'],
[ "Mesa de até 4 pessoas", 'Reserva de mesa completa' , '250,00']];


const index = (params) => {
  return (
    <div className={styles.wrapper}>

      <div>
        <h3>{ingressos[params.item][0]} </h3>
        <p>{ingressos[params.item][1]}</p>
      </div>
      

      <h2>RS {ingressos[params.item][2]}</h2>

      <button className={styles.button} onClick={() => window.location = '/Pagamento' }>Comprar</button>
    </div>
  )
}

export default index