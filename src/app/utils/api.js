const md5 = require('md5');

import { hashPassword } from '@/app/utils/database';

const apiKey = process.env.NEXT_PUBLIC_DB_API;
const token = "Bearer "+process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// ============ GET DATA ============ //

async function checkClientCPF(cpf){
  var url = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;

  await fetch(url)
  .then((response) => {
    if (!response.ok) {throw new Error(`Erro: ${response.status}`);}
    return response.json();
  })
  .then((data) => {

    var count = Object.keys(data).length / 4;
    if(count >= 1){
      // setCpfError('Já existe outro cadastro com este cpf')
      return false
    }else{
      return true
    }

  })
}

async function getClientCPF(cpf){
  var url = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;

  await fetch(url)
  .then((response) => {
    if (!response.ok) {throw new Error(`Erro: ${response.status}`);}
    return response.json();
  })
  .then((data) => {
    return data;
  })
}

async function getAllClient() {
  const url = process.env.NEXT_PUBLIC_DB_URL+`listAll.php?api_key=${apiKey}`;
    
  await fetch(url)
  .then((response) => {
      if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
      }
      return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => console.log(error.message));
}

async function getComprasClient(cpf) {
    
  const url = process.env.NEXT_PUBLIC_DB_URL+`getComprasCliente.php?api_key=${apiKey}&cpf=${cpf}`;
  
  await fetch(url)
  .then((response) => {
      if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
      }
      return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => console.log(error.message));
}

async function getAdmin(login) {
  const url = process.env.NEXT_PUBLIC_DB_URL+`getAdmin.php?api_key=${apiKey}&login=${login}`;
    
  await fetch(url)
  .then((response) => {
      if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
      }
      return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => console.log(error));
}

// ============ CREATE DATA ============ //

async function createCliente(nome, email, cpf, cep, telefone, password) {
  
  var senha = hashPassword(password); // [salt,hash]
  var salt = senha[0]
  var hash = senha[1]

  var url = process.env.NEXT_PUBLIC_DB_URL+`createCliente.php`;

  var clienteData = {apiKey, nome, email, cpf, cep, telefone, salt, hash};

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
    return data;
  })
  .catch((error) => console.log('erro cadastro cliente'));

}

async function createPreference(nome, email, cpf, quant){
  
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
        "unit_price": 360,
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
    "notification_url": process.env.NEXT_PUBLIC_DB_URL+"notification.php",
    "external_reference": cpf,
    "expires": false
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
  .then((response) => response.json())
  .then((result) => {

    setInitPoint(result.init_point)

    const link = result.init_point;

    window.location.href = link;
  })
  .catch((error) => console.error('erro api mercado pago'));
}

// ============ COMPLEX FLOW ============ //

async function registerClient(nome, email, cpf, cep, telefone, password){

  var check = checkClientCPF(cpf);

  if(check){
    try {
      createCliente(nome, email, cpf, cep, telefone, password);
    } catch (error) {
      
    }
  }

}



async function sendEmail(email, codigo) {

  var mensagem = "Obrigado pela compra! Aqui está uma cópia do seu código :"+codigo;

  const response = await fetch("https://localhost/send_email.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      subject: "Sua Compra",
      message: mensagem,
    }),
  });

  const result = await response.json();
  console.log(result.message);
}

module.exports = {
  sendEmail,
};