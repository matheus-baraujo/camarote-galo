'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'
import { getAllUrlParams } from "@/services/database";
import {updateSenha} from "@/services/api" 

function checkSenha(senha, senha2, setSenhaError, setSenhaError2) {
  setSenhaError('')
  setSenhaError2('')

  if ('' === senha) {
    setSenhaError('Campo vazio')
    return 
  }
  if (senha.length < 6) {
    setSenhaError('Senha deve ter 6 ou mais caracteres')
    return
  }

  if ('' === senha2) {
    setSenhaError2('Campo vazio')
    return
  }
  if (senha2.length < 6) {
    setSenhaError2('Senha deve ter 6 ou mais caracteres')
    return
  }
  if (senha != senha2){
    setSenhaError2('As senhas devem ser iguais')
    return
  }

  //console.log('ok')
  return true
}

async function atualizarSenha(id, hash, senha) {
  
  const update = updateSenha(id, hash, senha)
  
  if (update != false) {
    return true
  }else{
    return false
  }

}

async function handleClick(id, hash, senha, senha2, setSenhaError, setSenhaError2, setSucesso) {
  const check = checkSenha(senha, senha2, setSenhaError, setSenhaError2);
  if (check != true) {
    return
  }

  const att = await atualizarSenha(id, hash, senha)
  
  if (att != true) {
    return
  }

  setSucesso(true)
  return
}

const index = () => {

  const [senha, setSenha] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [senha2, setSenha2] = useState('');
  const [senhaError2, setSenhaError2] = useState('');

  const [id, setId] = useState('');
  const [hash, setHash] = useState('');

  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    
    var code = getAllUrlParams().code;

    if (code == null || code == undefined || code.length < 32) {
      window.location.href = '/'
    }

    var id1 = code.slice(0, code.length-32); 
    var hash1 = code.slice(-32);  

    //console.log(id1)
    //console.log(hash1)

    setId(id1)
    setHash(hash1)

  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        

        <div className={styles.wrapper2}>

          <h3 className={styles.title}>Recuperar Senha</h3>
          
          <div className={styles.form}>
            

            {sucesso ? 
              <>
                <h3 style={{textAlign: 'center'}}>Senha alterada com sucesso!</h3>
                <button className={styles.button} onClick={()=> window.location.href ='/'}>Página inicial</button>
              </>
              :
              <>
                <div className={styles.inputGroup}>
                  <label>Nova senha</label>
                  <input type="password" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                  <label className={styles.erro}>{senhaError}</label>
                </div>

                <div className={styles.inputGroup}>
                  <label>Confirmar Senha</label>
                  <input type="password" placeholder="Confirme sua senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} />
                  <label className={styles.erro}>{senhaError2}</label>
                </div>

                <button className={styles.button} onClick={()=> handleClick(id, hash, senha, senha2, setSenhaError, setSenhaError2, setSucesso)}>Confirmar</button>
              </>
            }

            
          </div>

        </div>

      </div>
    </>
  )
}

export default index