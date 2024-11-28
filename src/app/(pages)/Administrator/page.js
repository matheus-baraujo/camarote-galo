'use client'

import styles from "./page.module.css";
import { useState } from "react";

var md5 = require('md5');

const saltRounds = 10;
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default function Home() {

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = () => {
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

    console.log(login)

    var salt = makeid(5);
    var hash = '';

    for (let index = 0; index < saltRounds; index++) {
      hash = md5(hash+salt)  
    }

    console.log(salt)
    console.log(hash)

    // URL do endpoint com a chave de API
    const apiKey = 'minha_chave_secreta';
    
    const url = `http://localhost/api/getAdmin.php?api_key=${apiKey}&login=${login}`;

      fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => setData(data))
        .catch((error) => setError(error.message));
    
    console.log(data[0])
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
