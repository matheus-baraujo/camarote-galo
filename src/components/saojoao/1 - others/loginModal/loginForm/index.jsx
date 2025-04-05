'use client'

import { useState } from "react";
import styles from "./styles.module.css";

import { usarContexto } from '@/context/contexto';
import { loginUsuario } from "@/services/api"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { atualizarCliente } = usarContexto();

  var cpf = "999.999.999-99"; // CPF de teste
  var senha = "Admin1234"; // Senha de teste

  const handleLogin = async () => {
    try {
      loginUsuario(cpf, senha)
        .then((res) => {
          if (res == true){
            // console.log("Funcionou");
            atualizarCliente();
          }
          
        });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Entre na sua conta</h2>
      <div className={styles.loginBox}>
        
        <div className={styles.inputGroup}>
          <label>E-mail</label>
          <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className={styles.inputGroup}>
          <div className={styles.passwordHeader}>
            <label>Senha</label>
            <a href="#" className={styles.forgotPassword}>Esqueceu a senha?</a>
          </div>
          <input type={showPassword ? "text" : "password"} placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={styles.rememberMe}>
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
          <label>Lembrar de mim</label>
        </div>

        <button className={styles.loginButton} 
          onClick={()=>{ handleLogin(); }}>
            Entrar
        </button>
        <p className={styles.registerLink}>
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
