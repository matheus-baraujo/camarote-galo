'use client'

import { useState } from "react";

import ErroCarnaval from '../../../components/carnaval/0 - pages/ErroCarnaval'

export default function Erro() {

  const [evento, setEvento] = useState("saojoao");

  return (
    evento == "carnaval" ?
      <ErroCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
