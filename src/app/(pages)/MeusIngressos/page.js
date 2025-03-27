'use client'

import { usarContexto } from '@/context/contexto';

import MeusIngressosCarnaval from '@/components/carnaval/0 - pages/MeusIngressosCarnaval'

export default function MeusIngressos() {

  const { evento, setEvento } = usarContexto();

  return(
    evento == "carnaval" ?
      <MeusIngressosCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}