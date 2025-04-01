import React from 'react'
import styles from './styles.module.css'
import LoginForm from './loginForm'

const index = ({setLogar}) => {
  return (
    <>
    <div className={styles.backdrop} onClick={() => setLogar(false)}></div>

      <div className={styles.container}>
        <LoginForm />
      </div>

    </>
  )
}

export default index