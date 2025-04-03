import { useState } from "react";
import styles from "./styles.module.css";

export default function DadosPessoaisForm() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  return (
    <div className={styles.container}>

      <div className={styles.formContainer}>

        <h2 className={styles.title}>Dados pessoais</h2>

        <div className={styles.wrapper}>

          <div className={styles.row}>

            <div className={styles.inputGroup}>
              <label>Nome completo</label>
              <input type="text" placeholder="Digite seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>Telefone</label>
              <input type="text" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>CPF</label>
              <input type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </div>

          </div>


          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirmar E-mail</label>
              <input type="email" placeholder="seu@email.com" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirmar Senha</label>
              <input type="password" placeholder="Sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          <button className={styles.button}>Continuar para pagamento</button>
        </div>

      </div>

      <div className={styles.resumoContainer}>

        <h2 className={styles.title}>Resumo do pedido</h2>

        <div className={styles.wrapper}>
          <p>Ingresso Individual <span>0x</span></p>
          <p>Mesa para 4 pessoas <span>0x</span></p>
          <p className={styles.total}>Total <span>R$0,00</span></p>
          <div className={styles.infoBox}>
            Seus ingressos serão enviados para o seu e-mail após a confirmação do pagamento.
          </div>
        </div>

        

      </div>

    </div>
  );
}
