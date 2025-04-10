'use client'

import { usarContexto } from '@/context/contexto';

import AdministratorCarnaval from '@/components/carnaval/0 - pages/AdministratorCarnaval'
import AdministratorSoajoao from '@/components/saojoao/0 - pages/administratorSaojoao'

export default function Administrator() {

  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <AdministratorCarnaval />
    :
      <AdministratorSoajoao />
  );
}
