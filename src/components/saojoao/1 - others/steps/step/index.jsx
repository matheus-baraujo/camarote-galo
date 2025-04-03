import React from 'react'
import styles from './styles.module.css'

function styling(state) {
  switch (state) {
    case 0:
      return styles.done;

    case 1:
      return styles.now;

    case 2:
      return styles.todo;
  
    default:
      return styles.done;
  }
}

const index = ({number, text, state}) => {

  var classe = styles.number+' '+styling(state);

  return (
    <div className={styles.step}>
      <div className={classe}> <span>{number+1}</span> </div>
      <p>{text}</p>
    </div>
  )
}

export default index