//const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

import axios from 'axios';


// SDK do Mercado Pago
import { MercadoPago, MercadoPagoConfig, Payment } from 'mercadopago';

async function getAccessToken() {
  try {
    const response = await axios.post(
      'https://api.mercadopago.com/oauth/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter Access Token:', error.response?.data || error.message);
  }
}

// Exemplo de uso
//getAccessToken('SEU_CLIENT_ID', 'SEU_CLIENT_SECRET');


async function createPaymentPix() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Idempotency-Key", "0.6929731169467601");
  myHeaders.append("Authorization", "Bearer APP_USR-8863321753051093-112114-41a86e2093152d19ff5b839604fa15b9-2108742539");
  
  const raw = JSON.stringify({
    "transaction_amount": 1.34,
    "payment_method_id": "pix",
    "external_reference": "1234",
    "notification_url": "https://webhook.site/2cb587de-dc80-40f3-b1f8-6e62b879f770",
    "metadata": {
      "order_number": "order_1724857044"
    },
    "description": "PEDIDO NOVO - VIDEOGAME",
    "payer": {
      "first_name": "Joao",
      "last_name": "Silva",
      "email": "2cb587de-dc80-40f3-b1f8-6e62b879f770@emailhook.site",
      "identification": {
        "type": "CPF",
        "number": "70222030402"
      },
      "address": {
        "zip_code": "06233-200",
        "street_name": "Av. das Nações Unidas",
        "street_number": "3003",
        "neighborhood": "Bonfim",
        "city": "Osasco",
        "federal_unit": "SP"
      }
    },
    "additional_info": {
      "items": [
        {
          "id": "1941",
          "title": "Ingresso Antecipado",
          "description": "Natal Iluminado 2019",
          "picture_url": null,
          "category_id": "Tickets",
          "quantity": 1,
          "unit_price": 100,
          "event_date": "2019-12-25T19:30:00.000-03:00"
        }
      ],
      "payer": {
        "first_name": "Nome",
        "last_name": "Sobrenome",
        "is_prime_user": "1",
        "is_first_purchase_online": "1",
        "phone": {
          "area_code": "11",
          "number": "987654321"
        },
        "address": {
          "zip_code": "06233-200",
          "street_name": "Av. das Nações Unidas",
          "street_number": "3003"
        },
        "registration_date": "2013-08-06T09:25:04.000-03:00"
      }
    }
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("https://api.mercadopago.com/v1/payments", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

// Exemplo de uso
//createPayment('seu_access_token', 100.0, 'BRL', 'Descrição do produto ou serviço');

async function getPaymentStatus(accessToken, paymentId) {
    try {
        const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
            headers: {
            Authorization: `Bearer ${accessToken}`, // Token de acesso do Mercado Pago
            },
        }
        );

        console.log('Status do pagamento:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar status do pagamento:', error.response?.data || error.message);
    }
}

// Exemplo de uso
//getPaymentStatus('seu_access_token', 'id_do_pagamento');


async function createPreference(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer APP_USR-8863321753051093-112114-41a86e2093152d19ff5b839604fa15b9-2108742539");

  const raw = JSON.stringify({
    "auto_return": "approved",
    "back_urls": {
      "success": "http://httpbin.org/get?back_url=success",
      "failure": "http://httpbin.org/get?back_url=failure",
      "pending": "http://httpbin.org/get?back_url=pending"
    },
    "statement_descriptor": "TestStore",
    "items": [
      {
        "id": "010983098",
        "title": "My Product",
        "quantity": 1,
        "unit_price": 2000,
        "description": "Description of my product",
        "category_id": "retail"
      }
    ],
    "payer": {
      "email": "test_user_12398378192@testuser.com",
      "name": "Juan"
    },
    "payment_methods": {
      "excluded_payment_types": [
        { "id": "ticket" } // Exclui boletos
      ],
      "installments": 1,
      "default_payment_method_id": "account_money"
    },
    "notification_url": "https://www.your-site.com/webhook",
    "expires": true,
    "expiration_date_from": "2024-01-01T12:00:00.000-04:00",
    "expiration_date_to": "2024-12-31T12:00:00.000-04:00"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

async function Teste() {
  const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

  const payment = new Payment(client);

  // Primeiramente, obtenha as opções de métodos de pagamento
  try {
    // Endpoint para buscar os métodos de pagamento
    const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    });

    // Exibe os métodos de pagamento retornados
    console.log('Métodos de pagamento:', response.data);
  } catch (error) {
    console.error('Erro ao buscar métodos de pagamento:', error.response ? error.response.data : error.message);
  }
  

  const body = {
      transaction_amount: 12.34,
      description: 'Produto????',
      payment_method_id: 'credit_card',
      payer: {
          email: 'matheus-araujo1998@hotmail.com'
      },
  };

  payment.create({ body }).then(console.log).catch(console.log);
}

module.exports = {
  getAccessToken, 
  createPaymentPix,
  getPaymentStatus,
  createPreference,
  Teste,
};