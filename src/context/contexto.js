'use client'

import { createContext, useContext, useState } from 'react';

const Contexto = createContext();

export const usarContexto = () => {
  return useContext(Contexto);
};

export const ContextoProvider = ({ children }) => {

  //carnaval ou saojoao
  const [evento, setEvento] = useState('saojoao');

  return (
    <Contexto.Provider value={{ evento, setEvento }}>
      {children}
    </Contexto.Provider>
  );
};
