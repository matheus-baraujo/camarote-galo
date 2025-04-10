import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

import styles from './styles.module.css'

import { alterarCpf } from '@/services/database'
import { getClientCPF } from '@/services/api'

import Compra from './Compra'

import DataTable from 'react-data-table-component';

const index = () => {
  const [data, setData] = useState([]);

  const [lista, setLista] = useState(false);

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      width: '60px',
      sortable: true,
    },
    {
      name: 'Nome',
      selector: row => row.nome,
      grow: 2,
    },
    {
      name: 'Cpf',
      selector: row => row.cpf,
      grow: 3,
    },
    {
      name: 'Ingressos',
      selector: row => row.total_ingressos,
      width: '80px',
      sortable: true,
    },
    {
      name: 'Mesas',
      selector: row => row.total_mesas,
      width: '80px',
      sortable: true,
    },
    {
      name: "Status da Compra",
      selector: (row) => row.status_compra, // Para acesso no styling
      omit: true, // Oculta a coluna na tabela
    },
  ];

  // const data2 = [
  //   {
  //     "id": 1,
  //     "nome": "Cliente 1",
  //     "cpf": "123.456.789-00",
  //     "quantidade_total": 10,
  //     "status_compra": "approved"
  //   },
  //   {
  //     "id": 2,
  //     "nome": "Cliente 2",
  //     "cpf": "987.654.321-00",
  //     "quantidade_total": 0,
  //     "status_compra": "none"
  //   }
  // ]

  const [data2, setData2] = useState();

  const [totalIngressos, setTotalIngressos] = useState();

  const customStyles = {
    cells: {
      style: {
        // padding: '8px', // Ajusta o espaçamento interno
        justifyContent: 'center',
      },
    },
    headCells: {
      style: {
        // fontSize: '16px', // Personaliza o cabeçalho
        color: "var(--highlight)",
        backgroundColor: "var(--dark)",
        fontWeight: "bold",
        padding: 0,
        borderRadius: 0, 
        justifyContent: 'center',
      },
    },
    sortCaret: {
      style: {
        fill: 'var(--highlight)', // cor da seta
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.status_compra === "Aprovado",
      style: {
        backgroundColor: "#d4edda", // Verde claro
        color: "#155724", // Verde escuro
      },
    },
    {
      when: (row) => row.status_compra === "Pendente",
      style: {
        backgroundColor: "#fff3cd", // Amarelo claro
        color: "#856404", // Amarelo escuro
      },
    },
    
  ];

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  const [searched, setSearched] = useState(false)
  const [found, setFound] = useState(false)

  const [cliente,setCliente] = useState('');
  const [clienteCpf,setClienteCpf] = useState('');
  const [clienteEmail,setClienteEmail] = useState('');
  const [clienteTelefone,setClienteTelefone] = useState('');

  const lembrarCliente = (nome, cpf, email, telefone) =>{
    setCliente(nome);
    setClienteCpf(cpf);
    setClienteEmail(email);
    setClienteTelefone(telefone);
  }

  async function getCliente() {

    try{
      const data = await getClientCPF(cpf)
    
      //console.log(data)

      var count = Object.keys(data).length / 7;
        
      if(count == 1){
        //console.log('ok')
        lembrarCliente(data.nome, data.cpf, data.email, data.telefone)

        //console.log(found)
        setFound(true)
        
      }else{
        //console.log("registro não encontrado")
        setFound(false)
      }
      setSearched(true)

    } catch (error) {
      setFound(false)
      setSearched(true)
    }
  }

  async function fetchData(){
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getComprasCliente2.php?api_key=${apiKey}&cpf=${cpf}`;
    
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      setData(data)
      //console.log(data)
    })
    .catch((error) => {
      console.error(error.message)
      setData([])
    });
  }

  async function totalCompras(){
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getTotalCompras.php?api_key=${apiKey}`;
    
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      setTotalIngressos(data.total_ingressos)
    })
    .catch((error) => console.log(error.message));
  }

  const buscarCliente = async () => {
    // Set initial error values to empty
    setCpfError('')

    // Check if the user has entered both fields correctly
    if ('' === cpf) {
      setCpfError('Campo vazio')
      return
    }
    if (cpf.length < 14) {
      setCpfError('CPF Inválido')
      return
    }

    setLista(false);
    getCliente();
    fetchData();
  };

  const listar = async () => {
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    const url = `${process.env.NEXT_PUBLIC_DB_URL}listAll2.php?api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      const data = await response.json(); // <-- Esse await aqui é crucial
  
      //console.log('Dados recebidos:', data);
      setData2(data);
  
      setData([]);
      setSearched(false);
      setFound(false);
      setLista(true);
    } catch (error) {
      console.error('Erro ao buscar dados:', error.message);
    }
  };
  
  useEffect(() => {
    totalCompras();
    //console.log(totalIngressos)
  },[data2]);
  
  return (
    <>
      <div className={styles.wrapper}>

        <div className={styles.inputGroup}>
          <label>Cpf</label>
          <input type="text" placeholder="000.000.000-00" maxLength='15' value={cpf} onChange={(e) => alterarCpf(e.target.value, setCpf)} />
          <label className={styles.erro}>{cpfError}</label>
        </div>

        <div className={styles.buttons}>
          <button className={styles.busca} onClick={buscarCliente}>Buscar Cliente</button>

          {
            lista ? 
            <><button className={styles.lista} onClick={() => setLista(false)}>Esconder lista</button></>
            : 
            <><button className={styles.lista} onClick={listar}>Listar todos</button></> 
          }
          
        </div>
      </div>

      {found ? 
          <div className={styles.clientInfo}>
            <label htmlFor="client" className={styles.label}>Nome</label>
            <p id='client'>{cliente}</p>
            <label htmlFor="cpf" className={styles.label}>Cpf</label>
            <p id='cpf'>{clienteCpf}</p>
            <label htmlFor="email" className={styles.label}>Email</label>
            <p id='email'>{clienteEmail}</p>
            <label htmlFor="telefone" className={styles.label}>Telefone</label>
            <p id='telefone'>{clienteTelefone}</p>
          </div> 
          : searched ? 
          <>
            <p className={styles.notFound}>Registro não encontrado</p>
          </> : <></>
      }

      {
        found ?
          <div className={styles.container}>
            {data.map((item) =>{
              return(
                <Compra key={item.id} item={item} action={fetchData}/>
              )
            })}
          </div>
          
          :
          <></>
      }

      {
        lista ? 
          <>
            <p className={styles.totalIngressos}> Total de ingressos vendidos (aprovados) : <span>{totalIngressos}</span> </p>

            <div style={{borderRadius: "0px 0px 8px 8px", width: '100%'}}>
              <DataTable
                columns={columns}
                data={data2}
                customStyles={customStyles}
                direction="auto"
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                striped
                subHeaderAlign="right"
                subHeaderWrap
                conditionalRowStyles={conditionalRowStyles}
              /> 
            </div>
            
          </> : 
          <></>
      }
    
    </>
  )
}

export default index