import React from 'react'
import styles from './styles.module.css'

const index = ({ticket}) => {

  var aux;
  switch (ticket.status) {
    case 'Aprovado':
      aux = styles.wrapper+' '+styles.approved;
      break;

    case 'Pendente':
      aux = styles.wrapper+' '+styles.pending;
      break;

    case 'Cancelado':
      aux = styles.wrapper+' '+styles.refunded;
      break;
  
    default:
      aux = styles.wrapper;
      break;
  }

  return (
    <div className={aux}>

      {
        ticket && ticket.status === 'Pendente' ? (
          <div>
            <h3>Aguardando pagamento</h3>
            <p>Seu pagamento está pendente. Orientamos que verifique daqui a pouco na sessão minha conta.</p>
            <p>Em caso de problemas entre em contato conosco via whatsapp.</p>
          </div>
        )
        :
        ticket && ticket.status === 'Aprovado' ? (
          <div>
            <h3>Compra realizada com sucesso!</h3>
            <p>Seus ingressos estão prontos</p>
          </div>
        )
        :
        ticket && ticket.status === 'Cancelado' ? (
          <div>
            <h3>Compra cancelada</h3>
            <p>Seu pagamento foi cancelado. Em caso de duvida entre em contato conosco via whatsapp.</p>
          </div>
        )
        :
        <></>
      }

      
    </div>
  )
}

export default index