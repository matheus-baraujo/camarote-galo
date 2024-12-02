'use client'

require('dotenv').config()

import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'
import FormGroup from '../../../_components/FormGroup'
import StyledButton from '../../../_components/StyledButton'



const index = () => {

  //cliente
  const [nome, setNome] = useState('')
  const [nomeError, setNomeError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  
  const [email2, setEmail2] = useState('')
  const [emailError2, setEmailError2] = useState('')

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  const [quant, setQuant] = useState(1)
  const [quantError, setQuantError] = useState('')

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

  const onButtonClick = async () => {
    // Set initial error values to empty
    setNomeError('')
    setEmailError('')
    setEmailError2('')
    setCpfError('')

    
    //console.log(token)

    // Check if the user has entered fields correctly
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
    if ('' === cpf) {
      setCpfError('Campo vazio')
      return
    }
    if (cpf.length !== 14) {
      setCpfError('CPF inválido')
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
        if(data.cpf == cpf && data.email == email){
          //console.log('logado!!')
          //props.lembrarCliente(data.nome, data.cpf, data.email)
          //props.setLogin(true);

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
                  "title": "Ingresso",
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
          
        }else{
          //console.log('credenciais incorretas')
          setCpfError('Já existe outro cadastro com este cpf,\n\n por favor use o mesmo email ou outro cpf')
          return
        }
      }else{
        //setEmailError("registro não encontrado")
        //console.log("registro não encontrado")
      }
    })
    .catch((error) => {
        // CREATE CLIENTE
        const clienteData = {apiKey, nome, email, cpf};
        const token = process.env.NEXT_PUBLIC_DB_URL;
        const url = token+`createCliente.php`;

        console.log(url)
        console.log(clienteData)

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
                "title": "Ingresso",
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

        console.log(error.message)
    });





    // // CREATE CLIENTE
    
    // const clienteData = {apiKey, nome, email, cpf};
    // const token = process.env.NEXT_PUBLIC_DB_URL;
    // const url = token+`createCliente.php`;
    
    // // console.log(url)
    // // console.log(clienteData)

    // await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(clienteData),
    // })
    // .then((response) => {
    //     if (!response.ok) {
    //         throw new Error(`Erro: ${response.status}`);
    //     }
    //     return response.json();
    // })
    // .then((data) => {
    //   //console.log(data)

    //   const token = "Bearer "+process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    //   //create preference
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", token);
    //   const raw = JSON.stringify({
    //     "auto_return": "approved",
    //     "back_urls": {
    //       "success": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Sucesso",
    //       "failure": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Erro",
    //       "pending": process.env.NEXT_PUBLIC_DB_URL_RETURN+"Erro"
    //     },
    //     "statement_descriptor": "Camarote - Se Voce Nao For Eu Vou",
    //     "items": [
    //       {
    //         "id": "010983098",
    //         "title": "Ingresso",
    //         "quantity": quant,
    //         "unit_price": 340,
    //         "description": "Ingresso + kit(Camisa, Caneca, Pulseira)"
    //       }
    //     ],
    //     "payer": {
    //       "email": email,
    //       "name": nome
    //     },
    //     "payment_methods": {
    //       "excluded_payment_types": [{ id: "ticket" },],
    //       "excluded_payment_methods": [{ id: "bolbradesco" },],
    //       "installments": 1
    //     },
    //     "notification_url": "",
    //     "expires": false
    //   });
    //   const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow"
    //   };

    //   //console.log(raw)

    //   fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
    //     .then((response) => response.json())
    //     .then((result) => {

    //       setInitPoint(result.init_point)

    //       // console.log(cpf)
    //       // console.log(result)
    //       // console.log(result.id)
    //       // console.log(result.init_point)

    //       var idPreference = result.id;
    //       //const link = result.init_point;
    //       const link = result.init_point;

    //       //console.log(idPreference)
    //       const apiKey = process.env.NEXT_PUBLIC_DB_API;
    //       const preferenceData = {apiKey, idPreference, cpf, quant};

    //       //console.log(preferenceData)
    //       //console.log(clienteData)
    //       const url2 = process.env.NEXT_PUBLIC_DB_URL+`createPreference.php`;

    //       fetch(url2, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(preferenceData),
    //       })
    //       .then((response) => {
    //           if (!response.ok) {
    //               throw new Error(`Erro: ${response.status}`);
    //           }
    //           return response.json();
    //       })
    //       .then((data) => {
    //         // console.log(data)
    //         // console.log('consegui cadastrar cliente e preference')
    //         // console.log(link)
    //         window.location.href = link;
    //       })
    //       .catch((error) => console.error('erro cadastro preferencia'));
    //     })
    //     .catch((error) => console.error('erro api mercado pago'));
    // })
    // .catch((error) => console.log('erro cadastro cliente'));

  };

  return (
    <Form className={styles.Container}>
      <FormGroup type={0} valor={nome}    setting={setNome}     error={nomeError}/>
      <FormGroup type={1} valor={email}   setting={setEmail}    error={emailError}/>
      <FormGroup type={2} valor={email2}  setting={setEmail2}   error={emailError2}/>
      <FormGroup type={3} valor={cpf}     setting={alterarCpf}  error={cpfError}/>
      <FormGroup type={4} valor={quant}   setting={setQuant}    error={quantError}/>

      <StyledButton texto={'Pagar'} action={onButtonClick} />
      
    </Form>
  )
}

export default index