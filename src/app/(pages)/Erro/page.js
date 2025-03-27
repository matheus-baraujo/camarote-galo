'use client'

import { usarContexto } from '@/context/contexto';

import ErroCarnaval from '@/components/carnaval/0 - pages/ErroCarnaval'

export default function Erro() {

  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <ErroCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
