'USE CLIENT'

import styles from "./page.module.css";
import {getAccessToken, createTransaction, getTransactionStatus} from "./api/sumUp";

// (async () => {
//   // 1. Obter o Access Token
//   const accessToken = await getAccessToken();
//   if (!accessToken) return;

//   // 2. Criar uma Transação
//   const transaction = await createTransaction(accessToken);
//   if (!transaction) return;

//   console.log("Transação criada com sucesso!");
//   console.log("Link para pagamento:", transaction.checkout_url);

//   // 3. Verificar o Status da Transação
//   const status = await getTransactionStatus(accessToken, transaction.id);
//   if (status) {
//     console.log("Detalhes do pagamento:", status);
//   }
// })();

export default function Home() {

  var teste = getAccessToken()
  console.log(teste.accessToken)

  return (
    <div className={styles.page}>
      <h1>teste</h1>
      <p>testando pagamento</p>

    </div>
  );
}
