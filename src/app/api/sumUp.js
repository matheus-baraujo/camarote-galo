const axios = require('axios');

async function getAccessToken() {
  const clientId = 'SEU_CLIENT_ID'; // Substitua pelo seu Client ID
  const clientSecret = 'SEU_CLIENT_SECRET'; // Substitua pelo seu Client Secret

  try {
    const response = await axios.post('https://api.sumup.com/token', null, {
      params: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter o Access Token:', error.response?.data || error.message);
  }
}


async function createTransaction(accessToken) {
    const transactionData = {
      amount: '10.00', // Valor da transação
      currency: 'BRL', // Moeda
      description: 'Compra de Produto X',
      merchant_code: 'SEU_MERCHANT_CODE', // Substitua pelo código do seu vendedor
      payment_type: 'card', // Tipo de pagamento
      redirect_url: 'https://seusite.com/confirmacao-pagamento', // URL de redirecionamento
    };
  
    try {
      const response = await axios.post('https://api.sumup.com/v0.1/checkouts', transactionData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('URL de Checkout:', response.data.checkout_url);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar a transação:', error.response?.data || error.message);
    }
}

async function getTransactionStatus(accessToken, transactionCode) {
    try {
      const response = await axios.get(`https://api.sumup.com/v0.1/checkouts/${transactionCode}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log('Status da Transação:', response.data.status);
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar o status da transação:', error.response?.data || error.message);
    }
}
  

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
  
  