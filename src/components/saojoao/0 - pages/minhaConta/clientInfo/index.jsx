import React from 'react'
import styles from './styles.module.css'

const index = ({cliente}) => {
  return (
    <div className={styles.clientInfo}>
      <div className={styles.inputGroup}>
        <label>Nome completo</label>
        <input type="text" value={cliente.nome} disabled />
      </div>

      <div className={styles.inputGroup}>
        <label>Telefone</label>
        <input type="text" value={cliente.telefone} disabled />
      </div>

      <div className={styles.inputGroup}>
        <label>CPF</label>
        <input type="text" value={cliente.cpf} disabled />
      </div>

      <div className={styles.inputGroup}>
        <label>E-mail</label>
        <input type="email" value={cliente.email} disabled />
      </div>
    </div>
  )
}

export default index