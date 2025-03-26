'use client'

import { useState } from "react";

import GaleriaCarnaval from '../../../components/carnaval/0 - pages/GaleriaCarnaval'

export default function Galeria() {

  const [evento, setEvento] = useState("carnaval");

  return(
    evento == "carnaval" ?
      <GaleriaCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}