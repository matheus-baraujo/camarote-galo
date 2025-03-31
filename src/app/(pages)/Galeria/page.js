'use client'

import { usarContexto } from '@/context/contexto';

import GaleriaCarnaval from '@/components/carnaval/0 - pages/GaleriaCarnaval'

export default function Galeria() {

  const { evento, setEvento } = usarContexto();

  if(evento != "carnaval"){
    window.location.href = "/"
  }

  return(
    evento == "carnaval" ?
      <GaleriaCarnaval />
    :
      <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center", minHeight: "100%"}}>
        <h2>ERRO 404</h2>
      </div>
  );
}