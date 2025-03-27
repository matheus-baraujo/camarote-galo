'use client'

import { usarContexto } from '@/context/contexto';

import GaleriaCarnaval from '@/components/carnaval/0 - pages/GaleriaCarnaval'

export default function Galeria() {

  const { evento, setEvento } = usarContexto();

  return(
    evento == "carnaval" ?
      <GaleriaCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}