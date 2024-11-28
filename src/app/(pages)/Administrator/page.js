'use client'

import styles from "./page.module.css";
import { useState } from "react";

import { hashPassword, hashPassword2 } from "@/app/database/utilidades";

export default function Home() {

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === login) {
      setEmailError('Please enter your login')
      return
    }

    // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(login)) {
    //   setEmailError('Please enter a valid email')
    //   return
    // }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }


    // URL do endpoint com a chave de API
    const apiKey = 'minha_chave_secreta';
    
    const url = `http://localhost/api/getAdmin.php?api_key=${apiKey}&login=${login}`;
    
    await fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      setData(data)
      if(data.length == 1){
        
        var senha = hashPassword2(data[0].salt, password)
        
        if(data[0].hash == senha){
          console.log('logado!!')
          // setLoggedIn(true)
        }else{
          console.log('senha incorreta')
        }
      }else{
        console.log("login não encontrado")
      }
    })
    .catch((error) => setError(error.message));
      
  };

  return (
    <div>
      <h1>teste admin</h1>

      <div>
        <p>LOGIN</p>

        <input type="text" name="login" id="login" placeholder="login" onChange={(ev) => setLogin(ev.target.value)}/>
        <label className="errorLabel">{emailError}</label>

        <input
          type="password"
          name="password"
          id="senha"
          placeholder="senha"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>

        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />

        {loggedIn ? <div>O login funciona</div> : <div />}
      </div>
    </div>
  );
}
