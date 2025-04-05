'use client'

import React , {useState, useEffect} from 'react'
import styles from './styles.module.css'

import ClientInfo from './clientInfo/index.jsx'
import TicketList from './ticketList/index.jsx'
import DisplayTicket from '@/components/saojoao/1 - others/displayTicket'

import { getComprasClient } from '@/services/api.js'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTicketSimple, faCartShopping, faAngleRight, faDisplay } from '@fortawesome/free-solid-svg-icons';

import { usarContexto } from '@/context/contexto';

var icons = [[faTicketSimple, 'fas fa-ticket-simple'],
            [faUser, 'fas fa-user'],
            [faCartShopping, 'fas fa-cart-shopping'],
            [faAngleRight, 'fas fa-angle-right']]


const index = () => {

  const { cliente, setCliente } = usarContexto();

  const [ingressos, setIngressos] = useState([]);

  useEffect(() => {
    if(cliente == false){
      window.location.href = '/';
    }
  },[cliente]);

  useEffect(() => {
    if (!cliente || !cliente.data || !cliente.data.cpf) return;
  
    async function getCompras(cpf) {
      const data = await getComprasClient(cpf);
      setIngressos(data);
    }
  
    getCompras(cliente.data.cpf);
  }, [cliente]);

  useEffect(() => {
    console.log(ingressos);
  },[ingressos]);


  const [info, setInfo] = useState(false);
  
  const [compras, setCompras] = useState(false);
  

  const [detail, setDetail] = useState(false);
  const [ticket, setTicket] = useState({});


  return (
    <div className={styles.wrapper}> 

      {detail ? 
      

        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>

          <button className={styles.buttonReturn} onClick={() => {setDetail(false); setTicket({});}}>
            <FontAwesomeIcon icon={icons[3][0]} className={icons[3][1]} style={{transform: "rotate(180deg)"}}></FontAwesomeIcon>
            <span>Voltar</span> 
          </button>

          <div style={{borderRadius: "8px", overflow: "clip", border: "1px solid var(--dark)"}}>

            <div className={styles.title}><h3>Compra - {ticket.idPagamento} ({ticket.status})</h3></div>
            <div className={styles.wrapperTicket}>
              <DisplayTicket ticket={ticket}/> 
            </div>
          
          </div>

        </div>
        
        
        : 
        
        <div className={styles.wrapper2}>

          <div className={styles.title}><h3>Olá! O que gostaria de fazer?</h3></div>

          <div className={styles.content}>

            <p>Escolha uma das opções abaixo:</p>
            
            <button className={styles.buttonOdd} onClick={()=> {setCompras(false); setInfo(!info);}}>
              <div className={styles.buttonIcon}>
                <FontAwesomeIcon icon={icons[1][0]} className={icons[1][1]}></FontAwesomeIcon>  
                Meus Dados 
              </div>
              <FontAwesomeIcon icon={icons[3][0]} className={icons[3][1]} style={info ? {transition: "ease-in-out .3s", transform: "rotate(90deg)" } : {}}></FontAwesomeIcon>
            </button>

            {info ? <ClientInfo cliente={cliente.data}/> : null}


            <button className={styles.buttonEven} onClick={()=> {setInfo(false); setCompras(!compras);}}>
              <div className={styles.buttonIcon} >
                <FontAwesomeIcon icon={icons[0][0]} className={icons[0][1]}></FontAwesomeIcon> 
                Verificar Ingressos 
              </div>
              <FontAwesomeIcon icon={icons[3][0]} className={icons[3][1]} style={compras ? {transition: "ease-in-out .3s", transform: "rotate(90deg)" } : {}}></FontAwesomeIcon>
            </button>

            {compras ? <TicketList lista={ingressos} setInfo={setInfo} setCompras={setCompras} setDetail={setDetail} setTicket={setTicket}/> : null}

            <button className={styles.buttonOdd} onClick={()=> window.location.href = '/Pagamento'}>
              <div className={styles.buttonIcon}>
                <FontAwesomeIcon icon={icons[2][0]} className={icons[2][1]}></FontAwesomeIcon> 
                Comprar ingressos
              </div>
              <FontAwesomeIcon icon={icons[3][0]} className={icons[3][1]}></FontAwesomeIcon>
            </button>

          </div>

        </div>

        
        
        }

      
      
    </div>
  )
}

export default index