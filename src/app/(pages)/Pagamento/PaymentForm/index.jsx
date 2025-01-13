'use client'

require('dotenv').config()

import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'
import FormGroup from '../../../_components/FormGroup'
import StyledButton from '../../../_components/StyledButton'

import { hashPassword } from '@/app/database/utilidades';

const index = () => {

  const [page, setPage] = useState(0)

  const handleNext = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do botão


    setNomeError('')
    setEmailError('')
    setEmailError2('')
    setPasswordError('')
    setPasswordError2('')

    if ('' === nome) {
      setNomeError('Campo vazio')
      return
    }
    if ('' === email) {
      setEmailError('Campo vazio')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Email inválido')
      return
    }
    if ('' === email2) {
      setEmailError2('Campo vazio')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email2)) {
      setEmailError2('Email inválido')
      return
    }
    if (email != email2){
      setEmailError2('Os email devem ser iguais')
      return
    }
    if ('' === password) {
      setPasswordError('Campo vazio')
      return
    }
    if (password.length < 6) {
      setPasswordError('Senha deve ter 6 ou mais caracteres')
      return
    }
    if ('' === password2) {
      setPasswordError2('Campo vazio')
      return
    }
    if (password2.length < 6) {
      setPasswordError('Senha deve ter 6 ou mais caracteres')
      return
    }
    if (password != password2){
      setPasswordError2('As senhas devem ser iguais')
      return
    }

    setPage(page + 1); // Avança para a próxima página
  };

  const handlePrevious = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do botão
    setPage(page - 1); // Volta para a página anterior
  };


  //cliente
  const [nome, setNome] = useState('')
  const [nomeError, setNomeError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [email2, setEmail2] = useState('')
  const [emailError2, setEmailError2] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordError2, setPasswordError2] = useState('')

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  const [quant, setQuant] = useState(1)
  const [quantError, setQuantError] = useState('')

  const [telefone, setTelefone] = useState('')
  const [telefoneError, setTelefoneError] = useState('')

  const [cep, setCep] = useState('')
  const [cepError, setCepError] = useState('')

  //pagamento
  const [initPoint, setInitPoint] = useState(null);

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

  const phoneMask = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres que não sejam números
      .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses em torno do código de área
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona um traço após os primeiros 5 dígitos do número
      .replace(/(-\d{4})\d+?$/, '$1'); // Garante que apenas 4 números sejam mantidos após o traço
  };
  
  const alterarTelefone = (value) => {
    value = phoneMask(value);
    setTelefone(value); // Adapte para a função ou estado que você está utilizando
    // console.log(telefone)
  };

  const cepMask = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres que não sejam números
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o traço após os primeiros 5 dígitos
      .replace(/(-\d{3})\d+?$/, '$1'); // Garante que apenas 3 números sejam mantidos após o traço
  };
  
  const alterarCep = (value) => {
    value = cepMask(value);
    setCep(value); // Adapte para a função ou estado que você está utilizando
    // console.log(cep)
  };

  const onButtonClick = async () => {
    // Set initial error values to empty
    setCpfError('')
    setTelefoneError('')
    setCepError('')

    if ('' === cpf) {
      setCpfError('Campo vazio')
      return
    }
    if (cpf.length !== 14) {
      setCpfError('CPF inválido')
      return
    }
    if ('' === telefone) {
      setCpfError('Campo vazio')
      return
    }
    if (telefone.length !== 15) {
      setCpfError('Telefone inválido')
      return
    }
    if ('' === cep) {
      setCepError('Campo vazio')
      return
    }
    if (cep.length !== 9) {
      setCepError('CEP inválido')
      return
    }
    
    
    // checando cliente
    // URL do endpoint com a chave de API
    const apiKey = process.env.NEXT_PUBLIC_DB_API;
    
    const urlCheck = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;
    
    await fetch(urlCheck)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      //setData(data)
      //console.log(data)
      var count = Object.keys(data).length / 4;
      //console.log(count)
      //console.log(cpf)
      //console.log(email)
      
      if(count >= 1){
        setCpfError('Já existe outro cadastro com este cpf')
        return
      }
    })
    .catch((error) => {
        // CREATE CLIENTE

        var senha = hashPassword(password); // [salt,hash]
        var salt = senha[0]
        var hash = senha[1]


        const clienteData = {apiKey, nome, email, cpf, cep, telefone, salt, hash};
        const token = process.env.NEXT_PUBLIC_DB_URL;
        const url = token+`createCliente.php`;

        //console.log(url)
        //console.log(clienteData)

        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
          //console.log(data)

          const token = "Bearer "+process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          //create preference
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const raw = JSON.stringify({
            "auto_return": "approved",
            "back_urls": {
              "success": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Sucesso",
              "failure": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Erro",
              "pending": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Erro"
            },
            "statement_descriptor": "Camarote - Se Voce Nao For Eu Vou",
            "items": [
              {
                "id": "010983098",
                "title": "Ingresso - Se você não for eu vou",
                "quantity": quant,
                "unit_price": 340,
                "description": "Ingresso + kit(Camisa, Caneca, Pulseira)"
              }
            ],
            "payer": {
              "email": email,
              "name": nome
            },
            "payment_methods": {
              "excluded_payment_types": [{ id: "ticket" },],
              "excluded_payment_methods": [{ id: "bolbradesco" },],
              "installments": 1
            },
            "notification_url": "",
            "expires": false
          });
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          //console.log(raw)

          fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
            .then((response) => response.json())
            .then((result) => {

              setInitPoint(result.init_point)

              // console.log(cpf)
              // console.log(result)
              // console.log(result.id)
              // console.log(result.init_point)

              var idPreference = result.id;
              //const link = result.init_point;
              const link = result.init_point;

              //console.log(idPreference)
              const apiKey = process.env.NEXT_PUBLIC_DB_API;
              const preferenceData = {apiKey, idPreference, cpf, quant};

              //console.log(preferenceData)
              //console.log(clienteData)
              const url2 = process.env.NEXT_PUBLIC_DB_URL+`createPreference.php`;

              fetch(url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferenceData),
              })
              .then((response) => {
                  if (!response.ok) {
                      throw new Error(`Erro: ${response.status}`);
                  }
                  return response.json();
              })
              .then((data) => {
                // console.log(data)
                // console.log('consegui cadastrar cliente e preference')
                // console.log(link)
                window.location.href = link;
              })
              .catch((error) => console.error('erro cadastro preferencia'));
            })
            .catch((error) => console.error('erro api mercado pago'));
        })
        .catch((error) => console.log('erro cadastro cliente'));

        //console.log(error.message)
    });


  };

  return (
    <Form className={styles.Container}>

      {page == 0 ? 
        <>
          <FormGroup type={0} valor={nome}    setting={setNome}     error={nomeError}/>
          <FormGroup type={1} valor={email}   setting={setEmail}    error={emailError}/>
          <FormGroup type={2} valor={email2}  setting={setEmail2}   error={emailError2}/>

          <FormGroup type={5} valor={password}   setting={setPassword}    error={passwordError}/>
          <FormGroup type={9} valor={password2}  setting={setPassword2}   error={passwordError2}/>
        
          <button className={styles.button} onClick={handleNext}>Próximo</button>
        </>
      :
        <>
          <FormGroup type={3} valor={cpf}     setting={alterarCpf}  error={cpfError}/>
          <FormGroup type={7} valor={telefone}     setting={alterarTelefone}  error={telefoneError}/>
          <FormGroup type={8} valor={cep}     setting={alterarCep}  error={cepError}/>
          <FormGroup type={4} valor={quant}   setting={setQuant}    error={quantError}/>


          <button className={styles.button2} onClick={handlePrevious}>Voltar</button>
          <StyledButton texto={'Pagar'} action={onButtonClick} />
        </>
      }
      
    </Form>
  )
}

export default index