'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons"


const index = () => {


  // const [ urlHome, setUrlHome ] = useState(true)

  // useEffect(() => {
  //   var url = window.location.href;
  //   if(url != process.env.NEXT_PUBLIC_DB_URL_RETURN){
  //     setUrlHome(false)
  //   }
  // },[]);

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.wrapper}>

          <h2 className={styles.h2}>Se você não for eu vou</h2>

          <button className={styles.button} >
            <FontAwesomeIcon icon={faUser} className="far fa-user"></FontAwesomeIcon>
            Entrar
          </button>

        </div>
      </div>
    
    </>
    
  )
}

export default index