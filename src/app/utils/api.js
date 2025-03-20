const md5 = require('md5');



import { hashPassword } from '@/app/utils/database';

const apiKey = process.env.NEXT_PUBLIC_DB_API;

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





async function registerClient(nome, email, cpf, cep, telefone, salt, hash){
  // !$nome || !$email || !$cpf || !$cep || !$telefone || !$salt || !$hash


    
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