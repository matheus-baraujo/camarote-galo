const axios = require('axios');

async function getAccessToken() {

  try {
    const response = await axios.post('https://api.sumup.com/token',
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
    console.error('Erro ao obter o Access Token:', error.response?.data || error.message);
  }
}


async function createTransaction(accessToken, amount, currency, checkoutReference) {
  try {
    const response = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      new URLSearchParams({
        checkout_reference: checkoutReference, // Referência única da transação
        amount: amount.toString(), // Valor da transação
        currency: currency, // Moeda da transação
        description: 'Descrição do produto ou serviço', // Descrição opcional
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Token de autorização
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Transação criada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar transação:', error.response?.data || error.message);
  }
}

//createTransaction('seu_access_token', 100.0, 'BRL', 'referencia_transacao_12345');

async function getTransactionStatus(accessToken, transactionId) {
  try {
    const response = await axios.get(
      `https://api.sumup.com/v0.1/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Token de autorização
        },
      }
    );

    console.log('Status da transação:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter status da transação:', error.response?.data || error.message);
  }
}

//getTransactionStatus('seu_access_token', 'id_da_transacao');
  
module.exports = {
  getAccessToken, 
  createTransaction,
  getTransactionStatus
};





//teste

// (async () => {
//     // 1. Obter o Access Token
//     const accessToken = await getAccessToken();
//     if (!accessToken) return;
  
//     // 2. Criar uma Transação
//     const transaction = await createTransaction(accessToken);
//     if (!transaction) return;
  
//     console.log('Transação criada com sucesso!');
//     console.log('Link para pagamento:', transaction.checkout_url);
  
//     // 3. Verificar o Status da Transação
//     const status = await getTransactionStatus(accessToken, transaction.id);
//     if (status) {
//       console.log('Detalhes do pagamento:', status);
//     }
// })();
  
  