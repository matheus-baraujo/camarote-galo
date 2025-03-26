'use client'

import { useState } from "react";

import PagamentoCarnaval from '../../../components/carnaval/0 - pages/PagamentoCarnaval'

export default function Pagamento() {
  
  const [evento, setEvento] = useState("saojoao");

  return (
    evento == "carnaval" ?
      <PagamentoCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
