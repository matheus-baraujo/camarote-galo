'use client'

import React from 'react'
import styles from './styles.module.css'
import Navbar from './navbar'

const index = () => {
  return (
    <>
      <div className={styles.bg+ ' '+styles.wrapper} onClick={() => window.location.href='/'}>
        <h1 className={styles.h1} >São João do<br/>SE VOCÊ NÃO FOR EU VOU</h1>
      </div>
      <Navbar />
    </>
  )
}

export default index