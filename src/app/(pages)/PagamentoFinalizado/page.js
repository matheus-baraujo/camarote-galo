'use client'

import { usarContexto } from '@/context/contexto';

import SucessoCarnaval from '@/components/carnaval/0 - pages/SucessoCarnaval';
import PagamentoFinalizado from '@/components/saojoao/0 - pages/pagamentoFinalizado';

export default function Home() {

  const { evento, setEvento } = usarContexto();
  
  return (
    evento == "carnaval" ?
      <SucessoCarnaval />
    :
      <PagamentoFinalizado />
  );
}
