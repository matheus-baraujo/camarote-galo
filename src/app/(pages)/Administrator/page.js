'use client'

import { useState } from "react";

import AdministratorCarnaval from '../../../components/carnaval/0 - pages/AdministratorCarnaval'

export default function Administrator() {

  const [evento, setEvento] = useState("saojoao");

  return (
    evento == "carnaval" ?
      <AdministratorCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
