'use client'

import { useState } from "react";

import SucessoCarnaval from '../../../components/carnaval/0 - pages/SucessoCarnaval';

export default function Home() {

  const [evento, setEvento] = useState("saojoao");
  
  return (
    evento == "carnaval" ?
      <SucessoCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
