'use client'

import { createContext, useContext, useState, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";

const Contexto = createContext();

export const usarContexto = () => {
  return useContext(Contexto);
};

export const ContextoProvider = ({ children }) => {

  //carnaval ou saojoao
  const [evento, setEvento] = useState('saojoao');

  const [cliente, setCliente] = useState(false);


  const atualizarCliente = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCliente(decoded);
        console.log('Token decodificado:', decoded);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setCliente(false);
      }
    } else {
      setCliente(false);
      console.log('Nenhum token encontrado.');
    }
  };


  useEffect(() => {
    atualizarCliente();
  }, []);

  return (
    <Contexto.Provider value={{ evento, setEvento, cliente, setCliente, atualizarCliente }}>
      {children}
    </Contexto.Provider>
  );
};
