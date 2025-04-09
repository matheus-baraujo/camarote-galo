'use client'

import { usarContexto } from '@/context/contexto';

import RecuperarSenha from '@/components/saojoao/0 - pages/recuperarSenha'

export default function Pagamento() {
  
  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <></>
    :
      <RecuperarSenha />
  );
}
