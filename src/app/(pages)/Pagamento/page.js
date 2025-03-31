'use client'

import { usarContexto } from '@/context/contexto';

import PagamentoCarnaval from '@/components/carnaval/0 - pages/PagamentoCarnaval'
import PagamentoSaojoao from '@/components/saojoao/0 - pages/pagamentoSaojoao';

export default function Pagamento() {
  
  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <PagamentoCarnaval />
    :
      <PagamentoSaojoao />
  );
}
