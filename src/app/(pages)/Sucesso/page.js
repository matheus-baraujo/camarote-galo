'use client'

import { usarContexto } from '@/context/contexto';

import SucessoCarnaval from '@/components/carnaval/0 - pages/SucessoCarnaval';

export default function Home() {

  const { evento, setEvento } = usarContexto();
  
  return (
    evento == "carnaval" ?
      <SucessoCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
