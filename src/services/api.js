const { hashPassword } = require('../services/database');

const apiKey = process.env.NEXT_PUBLIC_DB_API;
const token = "Bearer "+process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// ============ GET DATA ============ //

async function checkClientCPF(cpf){

  try {
    var url = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${process.env.NEXT_PUBLIC_DB_API}&cpf=${cpf}`;

    var response = await fetch(url);

    // Se o status for 404, significa que o cliente não foi encontrado
    if (response.status === 404) {
      return true;
    }

    if(!response.ok) throw new Error(` ${response.statusText || response.status}`);
    
    var data = await response.json();
    var count = Object.keys(data).length / 4;

    if(count >= 1){
      throw new Error(`Já existe outro cadastro com este cpf`);
    }else{
      return true
    }
  } catch (error) {
    //console.error("Erro em checar cpf:", error);
    return { error: error.message };
  }

}

async function getClientCPF(cpf){
  
  try {
    var url = process.env.NEXT_PUBLIC_DB_URL+`getClienteCPF.php?api_key=${apiKey}&cpf=${cpf}`;

    var response = await fetch(url);
    if(!response.ok) throw new Error(`${response.error}`);
    
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro em buscar cliente:", error);
    return { error: error.message };
  }

}

async function getAllClient() {

  try {
    var url = process.env.NEXT_PUBLIC_DB_URL+`listAll.php?api_key=${apiKey}`;

    var response = await fetch(url);
    if(!response.ok) throw new Error(`${response.error}`);
    
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro em buscar lista de clientes:", error);
    return { error: error.message };
  }

}

async function getComprasClient(cpf) {

  try {
    var url = process.env.NEXT_PUBLIC_DB_URL+`getComprasCliente.php?api_key=${apiKey}&cpf=${cpf}`;

    var response = await fetch(url);
    if(!response.ok) throw new Error(`${response.error}`);
    
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar compras do cliente:", error);
    return { error: error.message };
  }
    
}

async function getAdmin(login) {

  try {
    var url = process.env.NEXT_PUBLIC_DB_URL+`getAdmin.php?api_key=${apiKey}&login=${login}`;

    var response = await fetch(url);
    if(!response.ok) throw new Error(`${response.error}`);
    
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o admin:", error);
    return { error: error.message };
  }

}

// ============ CREATE DATA ============ //

async function createCliente(nome, email, cpf, cep, telefone, password) {

  try {

    var senha = hashPassword(password); // [salt,hash]
    var salt = senha[0]
    var hash = senha[1]

    var url = process.env.NEXT_PUBLIC_DB_URL+`createCliente.php`;

    var clienteData = {apiKey, nome, email, cpf, cep, telefone, salt, hash}

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      })
    
    if (!response.ok) throw new Error(` ${response.statusText || response.status}`);

    var data = await response.json();

    return true
    
  } catch (error) {
    //console.error("Erro ao criar cliente:", error);
    return { error: error.message };
  }

}

// ============ MERCADO PAGO API ============ //

async function getPayment(id) {

  const myHeaders = new Headers();

  myHeaders.append("Authorization", token);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  var url = 'https://api.mercadopago.com/v1/payments/'+id

  var response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error(` ${response.statusText || response.status}`);
  var data = await response.json();

  return data;

}

async function createPreference(nome, email, cpf, quant){
  
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    var raw = JSON.stringify({
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
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    var response = await fetch("https://api.mercadopago.com/checkout/preferences", requestOptions);
    if (!response.ok) throw new Error("Erro ao gerar preference");

    var data = await response.json();

    return data;

  } catch (error) {
    
    console.error("Erro ao criar preference");
    return { error: error.message };

  }

}

// ============ COMPLEX FLOW ============ //

async function registerClient(cliente){

  try {
    var check = await checkClientCPF(cliente.cpf);
    if (check.error) throw new Error(check.error);

    var cadastro = await createCliente(cliente.nome, cliente.email, cliente.cpf, cliente.cep, cliente.telefone, cliente.password);
    if (cadastro.error) throw new Error(cadastro.error);

    return true;

  } catch (error) {
    //console.error("Erro no registro de cliente", error);
    return { error: error.message };
  }

}

// ============ EMAIL  ============ //

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
  getClientCPF,
  getAllClient,
  getComprasClient,
  getAdmin,
  createPreference,
  registerClient,
  sendEmail,
};