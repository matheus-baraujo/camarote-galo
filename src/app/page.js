'use client'

import { useState } from "react";

import HomeCarnaval from '../components/carnaval/0 - pages/HomeCarnaval'

export default function Home() {

  const [evento, setEvento] = useState("saojoao");

  return (
    evento == "carnaval" ?
      <HomeCarnaval />
    :
      <>
        <p>sao joao</p>
      </>
  );
}
