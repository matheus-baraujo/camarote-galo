import React from 'react'
import styles from './styles.module.css'

const index = () => {
  return (
    <div className={styles.Container}>
      <img style={{width:'100%', marginBottom:'50px'}} src="/assets/Open bar.png" alt="" />

      <p>Início 8h às 15h ou até às 16h com as bebidas que tiverem.</p>
      
      <ul>
        <li>Whisky Johnnie red </li>
        <li>Cervejas Heineken, bandwase e Pilsen </li>
        <li>Caipifrutas</li>
        <li>ICE </li>
        <li>Energético </li>
        <li>Água de côco  </li>
        <li>Guaraná  </li>
        <li>Água mineral  </li>
      </ul>
      
    </div>
  )
}

export default index