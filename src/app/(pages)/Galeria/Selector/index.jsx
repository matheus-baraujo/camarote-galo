import React, { useState } from 'react'
import styles from './styles.module.css'


const find = (array, item) => {
  for(var k = 0; k < array.length; k++){
    if(array[k][0] == item[0] && array[k][1] == item[1]){
        return k
    }
  } 
}

const index = (props) => {

  const [active, setActive] = useState([1,0,0,0,0,0,0])

  return (
    <div className={styles.selector}>

      {props.seletor.map((item) => {
        var aux = find(props.seletor, item);

        const onClickHandle = () => {
          let aux2 = [0,0,0,0,0,0,0];
          setActive(aux2)
          aux2[aux] = 1;
          setActive(aux2)
          props.action(item[1])
        }

        return (<button 
                className={active[aux] ? styles.active : null}
                onClick={onClickHandle}>
                  {item[0]}
                </button>)
      })}
    </div>
  )
}

export default index