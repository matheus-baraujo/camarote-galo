'use client'

import { usarContexto } from '@/context/contexto';

import HomeCarnaval from '../components/carnaval/0 - pages/HomeCarnaval'

export default function Home() {

  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <HomeCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
