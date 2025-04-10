'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Conteudo from './conteudo'

import { usarContexto } from '@/context/contexto';
import { createPreference } from '@/services/api';


async function handlePayment(nome, email, cpf, quant1, quant2){
  var preference = await createPreference(nome, email, cpf, quant1, quant2)
  //console.log(preference)

  if(preference != undefined){
    //console.log(preference.init_point)
    
    window.open(preference.init_point, "_self")
  }
}

const index = ({number, tickets, logar, setLogar, login, setLogin}) => {

  const { cliente } = usarContexto();

  const [dados, setDados] = useState();

  useEffect(() => {
    if (cliente != undefined && cliente != false) {
      setDados(cliente.data);
      console.log(dados);
    }

  },[cliente])

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
      
      <button className={styles.button} 
        //disabled={tickets[0].quantidade === 0 && tickets[1].quantidade === 0} 
        disabled={true}
        onClick={() => {cliente ? 
          handlePayment(dados.nome, dados.email, dados.cpf, tickets[0].quantidade, tickets[1].quantidade) 
          : 
          (setLogar(true), sessionStorage.setItem("tickets", [tickets[0].quantidade, tickets[1].quantidade])) }}>
        Finalizar Compra
      </button>

    </div>
  )
}

export default index