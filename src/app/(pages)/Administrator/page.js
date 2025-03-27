'use client'

import { usarContexto } from '@/context/contexto';

import AdministratorCarnaval from '@/components/carnaval/0 - pages/AdministratorCarnaval'

export default function Administrator() {

  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <AdministratorCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
