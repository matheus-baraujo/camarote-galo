import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

import styles from './styles.module.css'

import FormGroup from '../../../_components/FormGroup'
import StyledButton from '../../../_components/StyledButton'
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
      grow: 2,
    },
    {
      name: 'Ingressos',
      selector: row => row.quantidade_total,
      width: '120px',
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
        color: "#F4016A",
        fontWeight: "bold",
        padding: 0,
        justifyContent: 'center',
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.status_compra === "approved",
      style: {
        backgroundColor: "#d4edda", // Verde claro
        color: "#155724", // Verde escuro
      },
    },
    {
      when: (row) => row.status_compra === "pending",
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
  const [clienteCep,setClienteCep] = useState('');
  const [clienteTelefone,setClienteTelefone] = useState('');

  const lembrarCliente = (nome, cpf, email, cep, telefone) =>{
    setCliente(nome);
    setClienteCpf(cpf);
    setClienteEmail(email);
    setClienteCep(cep);
    setClienteTelefone(telefone);
  }

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  const alterarCpf = (value) => {
    value = cpfMask(value)
    setCpf(value)
    //console.log(cpf)
  }

  async function fetchData(){
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getComprasCliente.php?api_key=${apiKey}&cpf=${cpf}`;
    
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
    .catch((error) => console.log(error.message));
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

  async function getCliente() {
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const url = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;
    
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      var count = Object.keys(data).length / 8;
      
      if(count == 1){
        lembrarCliente(data.nome, data.cpf, data.email, data.cep, data.telefone)
        setFound(true)
        
      }else{
        //console.log("registro não encontrado")
        setFound(false)
      }
      setSearched(true)
    })
    .catch((error) => {
      setFound(false)
      setSearched(true)
    });
  }

  const onButtonClick = async () => {
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
    const url = process.env.NEXT_PUBLIC_DB_URL+`listAll.php?api_key=${apiKey}`;
    
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      //console.log(data)
      setData2(data);
    })
    .catch((error) => console.log(error.message));



    setData([]);
    setSearched(false);
    setFound(false);
    setLista(true);
  }


  useEffect(() => {
    totalCompras();
    //console.log(totalIngressos)
  },[data2]);
  
  return (
    <>
      <Form className={styles.form}>
        <FormGroup className={styles.formGroup} type={3} valor={cpf}  setting={alterarCpf}   error={cpfError}/>


        <div className={styles.buttons}>
          <Button className={styles.busca} onClick={onButtonClick}>Buscar Cliente</Button>

          {
            lista ? 
            <><Button className={styles.lista} onClick={() => setLista(false)}>Esconder lista</Button></>
            : 
            <><Button className={styles.lista} onClick={listar}>Listar todos</Button></> 
          }
          
        </div>
      </Form>

      {found ? 
          <div className={styles.clientInfo}>
            <label htmlFor="client" className={styles.label}>Nome</label>
            <p id='client'>{cliente}</p>
            <label htmlFor="cpf" className={styles.label}>Cpf</label>
            <p id='cpf'>{clienteCpf}</p>
            <label htmlFor="email" className={styles.label}>Email</label>
            <p id='email'>{clienteEmail}</p>
            <label htmlFor="cep" className={styles.label}>Cep</label>
            <p id='cep'>{clienteCep}</p>
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
          data.map((item) =>{
            return(
              <Compra key={item.id} codigo={item.codigoRecebimento} id={item.idPagamento} status={item.status} quant={item.quant} recebimento={item.statusRecebimento} action={fetchData}/>
            )
          })
          :
          <></>
      }

      {
        lista ? 
          <>
            <p className={styles.totalIngressos}> Total de ingressos vendidos (aprovados) : <span>{totalIngressos}</span> </p>

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
          </> : 
          <></>
      }
    
    </>
  )
}

export default index