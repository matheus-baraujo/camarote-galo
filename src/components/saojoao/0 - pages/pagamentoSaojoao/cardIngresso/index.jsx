import React from "react";
import styles from "./styles.module.css";

const TicketCard = ({ tickets, setTickets, number }) => {
  
  const alterarQuantidade = (incremento) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket, index) =>
        index === number
          ? { ...ticket, quantidade: ticket.quantidade + incremento }
          : ticket
      )
    );
  };

  return (
    <div className={styles.card}>
      <h3>{tickets[number]?.tipo}</h3>
      <div className={styles.wrapper}>
        <div className={styles.cardIngresso}>
          <p>{tickets[number]?.descricao}</p>
          <h2>R$ {tickets[number]?.preco},00</h2>
        </div>

        <div className={styles.contador}>
          <button
            disabled={tickets[number]?.quantidade <= 0}
            onClick={() => alterarQuantidade(-1)}
          >
            -
          </button>

          <h3>{tickets[number]?.quantidade}</h3>

          <button
            onClick={() => alterarQuantidade(1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
