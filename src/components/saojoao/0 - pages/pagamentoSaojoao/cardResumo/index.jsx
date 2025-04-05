import React from 'react'
import styles from './styles.module.css'
import Conteudo from './conteudo'

import { usarContexto } from '@/context/contexto';

const index = ({number, tickets, logar, setLogar, login, setLogin}) => {

  const { cliente } = usarContexto();

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.wrapper2}>
        <h3>Resumo do pedido</h3>
      </div>

      {[0,1].map((item, index) => (
        <Conteudo key={index} number={item} tickets={tickets} />    
      ))}

      <div className={styles.wrapper3}>
        <h4>Total</h4>
        <h4>R$ {tickets[0].preco*tickets[0].quantidade + tickets[1].preco*tickets[1].quantidade},00</h4>
      </div>      
      
      <button className={styles.button} disabled={tickets[0].quantidade === 0 && tickets[1].quantidade === 0} 
        onClick={() => {cliente ? alert('Compra finalizada com sucesso!') : setLogar(true)}}>
        Finalizar Compra
      </button>

    </div>
  )
}

export default index