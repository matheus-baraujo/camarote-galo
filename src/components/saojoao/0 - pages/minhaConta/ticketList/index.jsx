import React from 'react'
import styles from './styles.module.css'

const index = ({lista, setInfo, setCompras, setDetail, setTicket}) => {

  const handleTicketClick = (ticket) => {
    setInfo(false);
    setCompras(false);
    setDetail(true);
    setTicket(ticket)
  }

  return (
    <div className={styles.ticketList}>
      
      {
        lista.length === 0 ? 
          <p className={styles.msgEmpty}>Você não possui ingressos comprados</p> :

          lista.map((ticket, index) => (
            <button key={index} onClick={() => {handleTicketClick(ticket)}}
            style={ticket.status === "Aprovado" ? {backgroundColor: "#aeffb1"} : 
                  ticket.status === "Pendente" ? {backgroundColor: "#fdff80"} : 
                  ticket.status === "Cancelado" ? {backgroundColor: "#ff7b7b"} : {}}>
              <span>Individual x{ticket.quantidade1}</span>
              <span>Mesa x{ticket.quantidade2}</span>
              <span>{ticket.status}</span>
            </button>
          ))
      
      }

    </div>
  )
}

export default index