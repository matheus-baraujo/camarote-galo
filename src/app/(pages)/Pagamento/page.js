'use client'

import { usarContexto } from '@/context/contexto';

import PagamentoCarnaval from '@/components/carnaval/0 - pages/PagamentoCarnaval'

export default function Pagamento() {
  
  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <PagamentoCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
