//const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

import axios from 'axios';

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
      "excluded_payment_types": [],
      "excluded_payment_methods": [],
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


module.exports = {
  getAccessToken,
  getPaymentStatus,
  createPreference,
};