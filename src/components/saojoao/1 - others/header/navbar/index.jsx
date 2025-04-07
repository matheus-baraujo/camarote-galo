'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'

import { usePathname } from 'next/navigation';

import { usarContexto } from '@/context/contexto';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons"

import LoginModal from '@/components/saojoao/1 - others/loginModal';


const index = () => {

  const pathname = usePathname();

  const { cliente, setCliente } = usarContexto();

  const [logar, setLogar] = useState(false) // como habilitar o modal de login


  return (
    <>
      <div className={styles.bg}>
        <div className={styles.wrapper}>

          <h2 className={styles.h2} style={pathname == '/Pagamento' || pathname == '/Cadastro' ? {textAlign: 'center'} : {}}>
            {pathname == '/Pagamento' ? 'Pagamento' : pathname == '/Cadastro' ? 'Cadastro' : pathname == '/PagamentoFinalizado' ? 'Compra Finalizada' : 'Se você não for eu vou'}
          </h2>

          { cliente ? 

            <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
              <button className={styles.button} onClick={() => window.location.href='/MinhaConta'}>
                <FontAwesomeIcon icon={faUser} className="far fa-user"></FontAwesomeIcon>
                Minha conta
              </button>
              <button className={styles.button} onClick={() => {sessionStorage.removeItem("token"); setCliente(false)}}>
                Sair
              </button>
            </div>
            
            :
            <button className={styles.button} onClick={() => setLogar(true)}>
              <FontAwesomeIcon icon={faUser} className="far fa-user"></FontAwesomeIcon>
              Entrar
            </button>
          }

        </div>
      </div>

      {logar ?  <LoginModal  setLogar={setLogar}/> : <></>}
    
    </>
    
  )
}

export default index