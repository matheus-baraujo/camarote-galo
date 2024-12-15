import React, { useState } from 'react'
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
      selector: row => row.ingressos,
      width: '120px',
      sortable: true,
    },
  ];
  const data2 = [
  	{
      id: 2,
      nome: 'Matheus Batista de Araújo',
      cpf: '702.220.304-02',
      ingressos: '20',
    },
    {
      id: 1,
      nome: 'Teste2',
      cpf: '702.220.304-02',
      ingressos: '20',
    },
  ]
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
    setData([]);
    setSearched(false);
    setFound(false);
    setLista(true);
  }
  
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
            /> 
          </> : 
          <></>
      }
    
    </>
  )
}

export default index