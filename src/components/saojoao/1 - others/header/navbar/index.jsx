'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'

import { usarContexto } from '@/context/contexto';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons"

import LoginModal from '@/components/saojoao/1 - others/LoginModal';


const index = () => {

  const { cliente, atualizarCliente } = usarContexto();

  const [logar, setLogar] = useState(false) // habilitar o modal de login


  return (
    <>
      <div className={styles.bg}>
        <div className={styles.wrapper}>

          <h2 className={styles.h2}>Se você não for eu vou</h2>

          <button className={styles.button} onClick={() => setLogar(true)}>
            <FontAwesomeIcon icon={faUser} className="far fa-user"></FontAwesomeIcon>
            Entrar
          </button>

        </div>
      </div>

      {logar ?  <LoginModal  setLogar={setLogar}/> : <></>}
    
    </>
    
  )
}

export default index