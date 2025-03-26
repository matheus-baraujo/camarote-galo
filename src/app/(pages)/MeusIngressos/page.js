'use client'

import { useState } from "react";

import MeusIngressosCarnaval from '../../../components/carnaval/0 - pages/MeusIngressosCarnaval'

export default function MeusIngressos() {

  const [evento, setEvento] = useState("saojoao");

  return(
    evento == "carnaval" ?
      <MeusIngressosCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}