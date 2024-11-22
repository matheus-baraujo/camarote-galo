import styles from "./page.module.css";
//import { useState } from "react";
import {getAccessToken, createPaymentPix, getPaymentStatus, createPreference, Teste} from './mercadoPago/mercadoPago'

export default function Home() {

  
  //const teste = createPreference();
  //const teste2 = getAccessToken();

  // const [initPoint, setInitPoint] = useState(null);

  // const handlePayment = async () => {
  //   try {
  //     const url = await createPreference();
  //     setInitPoint(url); // Salva a URL para redirecionar ou abrir no checkout
  //   } catch (error) {
  //     console.error('Erro no pagamento:', error);
  //   }
  // };

  // console.log(initPoint)

  return (
    <div>
      <h1>teste</h1>
      <p>testando pagamento</p>

    </div>
  );
}
