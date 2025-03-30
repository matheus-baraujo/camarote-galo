'use client'

import { usarContexto } from '@/context/contexto';

import HomeCarnaval from '../components/carnaval/0 - pages/HomeCarnaval'
import HomeSaoJoao from '../components/saojoao/0 - pages/HomeSaoJoao'


export default function Home() {

  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <HomeCarnaval />
    :
      <HomeSaoJoao />
  );
}
