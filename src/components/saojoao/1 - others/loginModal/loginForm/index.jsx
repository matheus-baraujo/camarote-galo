'use client'

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { usarContexto } from '@/context/contexto';
import { loginUsuario } from "@/services/api"; 
import { alterarCpf } from "@/services/database";

export default function LoginForm( {setLogar} ) {

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')
  
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { atualizarCliente } = usarContexto();

  const handleLogin = async () => {

    setCpfError('');
    setPasswordError('');

    if (cpf.length < 14) {
      setCpfError('Campo obligatório!');
      return;
    }

    if (password.length == 0) {
      setPasswordError('Campo obligatório!');
      return;
    }else if (password.length < 6) {
      setPasswordError('Senha invalida!');
      return;
    }

    try {
      loginUsuario(cpf, password)
        .then((res) => {

          if (res == 404) {
            setCpfError('CPF não encontrado!');
          } 
          else if(res == true){
            atualizarCliente();
            setLogar(false);
          }
          else {
            setPasswordError('Credenciais incorretas!');
          }
          
        });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  const esqueciSenha = async () =>{
    setCpfError('');

    if (cpf.length < 14) {
      setCpfError('Campo obligatório!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cpf", cpf);
  
      const response = await fetch("/api/recuperarSenha.php", {
        method: "POST",
        body: formData,
      });
  
      const resultado = await response.json();
  
      if (resultado.status === "success") {
        //alert("E-mail de recuperação enviado com sucesso!");
        return true
      } else {
        return false
        //alert("Erro: " + resultado.message);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      //alert("Erro ao enviar CPF.");
    }

  }


  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Entre na sua conta</h2>
      <div className={styles.loginBox}>
        
        <div className={styles.inputGroup}>
          <label>Cpf</label>
          <input type="text" placeholder="000.000.000-00" maxLength='15' value={cpf} onChange={(e) => alterarCpf(e.target.value, setCpf)} />
          <label className={styles.erro}>{cpfError}</label>
        </div>
        
        <div className={styles.inputGroup}>
          <div className={styles.passwordHeader}>
            <label>Senha</label>
            <a href="#" className={styles.forgotPassword} onClick={() => esqueciSenha()}>Esqueceu a senha?</a>
          </div>
          <input type={showPassword ? "text" : "password"} placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className={styles.erro}>{passwordError}</label>
        </div>

        {/* <div className={styles.rememberMe}>
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
          <label>Lembrar de mim</label>
        </div> */}

        <button className={styles.loginButton} 
          onClick={()=>{ handleLogin(); }}>
            Entrar
        </button>
        <p className={styles.registerLink}>
          Não tem uma conta? <a href="/Cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
