'use client'

import React from 'react'
import styles from './styles.module.css'
import Navbar from './navbar'

import { usePathname } from 'next/navigation';

const index = () => {

  const pathname = usePathname();

  return (
    <>
      <div className={styles.bg+ ' '+styles.wrapper} onClick={() => window.location.href='/'}>

        {
          pathname == '/Pagamento' || pathname == '/Cadastro' || pathname == '/MinhaConta' || pathname == '/PagamentoFinalizado'  ? 
          <>
            <button className={styles.button} onClick={() => { sessionStorage.removeItem("tickets");   window.location.href='/'}}>
              Início
            </button>
          </> 
          : 
          <></>
        }
        <h1 className={styles.h1} >São João do<br/>SE VOCÊ NÃO FOR EU VOU</h1>
      </div>
      <Navbar />
    </>
  )
}

export default index