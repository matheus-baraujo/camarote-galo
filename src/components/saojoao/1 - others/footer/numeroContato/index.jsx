import React from 'react'
import styles from './styles.module.css'

const index = (params) => {

  var number = params.number.replace(/-/g, "");
  var url = 'https://api.whatsapp.com/send?phone=55819'+number;

  return (
    <div className={styles.numeroContato}>
      <a href={url} target='_blank' >
        <img src="/saojoao/assets/whatsapp.webp" alt="whatsapp" />
        (81) 9 {params.number} 
      </a>
    </div>
    
  )
}

export default index