'use client'

import { usarContexto } from '@/context/contexto';

import CadastroSaojoao from '@/components/saojoao/0 - pages/cadastroSaojoao';

export default function Pagamento() {
  
  const { evento, setEvento } = usarContexto();

  return (
    evento == "carnaval" ?
      <> </>
    :
      <CadastroSaojoao />
  );
}
