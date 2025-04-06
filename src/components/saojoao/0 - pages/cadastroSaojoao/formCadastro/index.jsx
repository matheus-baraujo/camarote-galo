import { useState } from "react";
import styles from "./styles.module.css";

import { usarContexto } from '@/context/contexto';
import { loginUsuario , checkClientCPF, createCliente } from "@/services/api"; 

import { alterarTelefone, alterarCpf, checkEmail } from "@/services/database";

function checarDados ({nome, setNomeError, email, setEmailError, confirmEmail, setConfirmEmailError, 
                      password, setPasswordError, confirmPassword, setConfirmPasswordError, cpf, 
                      setCpfError, telefone, setTelefoneError}) {

  setNomeError('')

  setEmailError('')
  setConfirmEmailError('')

  setPasswordError('')
  setConfirmPasswordError('')

  setCpfError('')

  setTelefoneError('')

  if ('' === nome) {
    setNomeError('Campo vazio')
    return
  }

  if ('' === telefone) {
    setTelefoneError('Campo vazio')
    return
  }
  if (telefone.length !== 15) {
    setTelefoneError('Telefone inválido')
    return
  }

  if ('' === cpf) {
    setCpfError('Campo vazio')
    return
  }
  if (cpf.length !== 14) {
    setCpfError('CPF inválido')
    return
  }

  if ('' === email) {
    setEmailError('Campo vazio')
    return
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError('Email inválido')
    return
  }

  if ('' === confirmEmail) {
    setConfirmEmailError('Campo vazio')
    return
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(confirmEmail)) {
    setConfirmEmailError('Email inválido')
    return
  }
  if (email != confirmEmail){
    setConfirmEmailError('Os email devem ser iguais')
    return
  }

  if ('' === password) {
    setPasswordError('Campo vazio')
    return
  }
  if (password.length < 6) {
    setPasswordError('Senha deve ter 6 ou mais caracteres')
    return
  }

  if ('' === confirmPassword) {
    setConfirmPasswordError('Campo vazio')
    return
  }
  if (confirmPassword.length < 6) {
    setPasswordError('Senha deve ter 6 ou mais caracteres')
    return
  }
  if (password != confirmPassword){
    setConfirmPasswordError('As senhas devem ser iguais')
    return
  }

  //dados checados com sucesso
  return true
  
}

async function cadastrar({nome, email, password, cpf, telefone, setCpfError}) {

  try {
    var cadastrar = await checkClientCPF(cpf);

    //não há cadastro com este cpf//
    if (cadastrar == true) {
      var cadastrado = await createCliente(nome, email, password, cpf, telefone);
      
      if(cadastrado == true){
        return true
      }else{
        setCpfError("Já há um cadastro com esse cpf")
        return false
      }
    }

  } catch (error) {
    console.error(error)
    return false
  }
}


export default function DadosPessoaisForm() {

  const { atualizarCliente } = usarContexto();

  const [nome, setNome] = useState('')
  const [nomeError, setNomeError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmEmailError, setConfirmEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  const [telefone, setTelefone] = useState('')
  const [telefoneError, setTelefoneError] = useState('')

  const logar = async () => {
    try {
      loginUsuario(cpf, password)
        .then((res) => {
          atualizarCliente();
          return true
        });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false
    }
  }

  const handleClick = async ({nome, setNomeError, email, setEmailError, confirmEmail, setConfirmEmailError, 
    password, setPasswordError, confirmPassword, setConfirmPasswordError, cpf, 
    setCpfError, telefone, setTelefoneError}) =>{

    var step1 = checarDados({nome, setNomeError, email, setEmailError, confirmEmail, setConfirmEmailError, password, setPasswordError, confirmPassword, setConfirmPasswordError, cpf, setCpfError, telefone, setTelefoneError});
    var step2 = false;
    var step3 = false;

    if(step1){
      step2 = await cadastrar({nome, email, password, cpf, telefone, setCpfError});

      if (step2) {
        step3 = await logar({cpf, password});

        if (step3) {
          console.log("fluxo completado")
        }
      }
    }
  }

  return (
    <div className={styles.container}>

      <div className={styles.formContainer}>

        <h2 className={styles.title}>Dados pessoais</h2>

        <div className={styles.wrapper}>

          <div className={styles.row}>

            <div className={styles.inputGroup}>
              <label>Nome completo</label>
              <input type="text" placeholder="Digite seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
              <label className={styles.error}>{nomeError}</label>
            </div>

            <div className={styles.inputGroup}>
              <label>Telefone</label>
              <input type="text" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => alterarTelefone(e.target.value, setTelefone)} />
              <label className={styles.error}>{telefoneError}</label>
            </div>

            <div className={styles.inputGroup}>
              <label>CPF</label>
              <input type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => alterarCpf(e.target.value, setCpf)} />
              <label className={styles.error}>{cpfError}</label>
            </div>

          </div>


          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className={styles.error}>{emailError}</label>
            </div>
            <div className={styles.inputGroup}>
              <label>Confirmar E-mail</label>
              <input type="email" placeholder="seu@email.com" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
              <label className={styles.error}>{confirmEmailError}</label>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className={styles.error}>{passwordError}</label>
            </div>
            <div className={styles.inputGroup}>
              <label>Confirmar Senha</label>
              <input type="password" placeholder="Sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <label className={styles.error}>{confirmPasswordError}</label>
            </div>
          </div>

          <button className={styles.button} onClick={() => handleClick({nome, setNomeError, email, setEmailError, confirmEmail, setConfirmEmailError, password, setPasswordError, confirmPassword, setConfirmPasswordError, cpf, setCpfError, telefone, setTelefoneError})}>Continuar para pagamento</button>
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
