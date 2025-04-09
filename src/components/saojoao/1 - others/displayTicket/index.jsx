'use client'

import React, { useRef } from 'react'
import styles from './styles.module.css'

import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTicketSimple, faDownload, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope , faCalendar } from "@fortawesome/free-regular-svg-icons";

import { usarContexto } from '@/context/contexto';

const info = [
  [faCalendar, 'far fa-calendar'],
  [faLocationDot, 'fas fa-location-dot'],
  [faTicketSimple, 'fas fa-ticket-simple'],
  [faDownload, 'fas fa-download'],
  [faEnvelope, 'far fa-envelope'],
  [faShareNodes, 'fas fa-share-nodes']
];

const Index = ({ ticket }) => {

  const { cliente, setCliente } = usarContexto();

  const ref = useRef(null);

  const shareTicket = async () => {
    if (!ref.current) return;
  
    try {
      const canvas = await html2canvas(ref.current);
  
      let blob = null;
  
      if (canvas.toBlob) {
        // Navegadores modernos
        blob = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b), "image/png");
        });
      } else {
        // Fallback para navegadores que não suportam toBlob (ex: Safari)
        const dataUrl = canvas.toDataURL("image/png");
  
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
  
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
  
        blob = new Blob([ia], { type: mimeString });
      }
  
      if (!blob) {
        alert("Erro ao capturar imagem");
        return;
      }
  
      const file = new File([blob], "captura.png", { type: "image/png" });
  
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Ingresso",
          text: "Ingresso - sevcnaoforeuvou",
        });
      } else {
        alert("Este navegador não suporta compartilhamento de imagem.");
      }
  
    } catch (error) {
      console.error("Erro ao compartilhar imagem:", error);
    }
  };

  const downloadTicket = async () => {
    if (!ref.current) return;
  
    try {
      const canvas = await html2canvas(ref.current);
  
      let blob = null;
  
      if (canvas.toBlob) {
        blob = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b), "image/png");
        });
      } else {
        const dataUrl = canvas.toDataURL("image/png");
  
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
  
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
  
        blob = new Blob([ia], { type: mimeString });
      }
  
      if (!blob) {
        alert("Erro ao gerar imagem para download");
        return;
      }
  
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "meu-ingresso.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error("Erro ao baixar imagem:", error);
    }
  };
  
  const sendTicketByEmail = async (email) => {
    if (!ref.current) return;
  
    try {
      const canvas = await html2canvas(ref.current);
      const blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
  
      if (!blob) {
        alert("Erro ao gerar imagem.");
        return;
      }
  
      const formData = new FormData();
      formData.append("email", email);
      formData.append("image", blob, "ingresso.png");
  
      const response = await fetch("/send_email.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.status === "success") {
        alert("Ingresso enviado com sucesso!");
      } else {
        alert("Erro: " + result.message);
      }
  
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Erro ao enviar e-mail.");
    }
  };

  const code = ticket.status !== 'Aprovado' ? "******" : ticket.codigoRecebimento;

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.accessCodeContainer} >
        <h3>Código de acesso ao evento</h3>
        <div className={styles.codeBoxes}>
          {code.split('').map((num, index) => (
            <span key={index} className={styles.codeBox}>{num}</span>
          ))}
        </div>
        <p>Apresente este código na entrada do evento</p>
      </div>

      <div className={styles.eventDetails}>
        <h3><FontAwesomeIcon icon={info[2][0]} className={info[2][1]} /></h3>
        <h3>São João do Se você não for eu vou</h3>
        <p>
          <span className={styles.icon}><FontAwesomeIcon icon={info[0][0]} className={info[0][1]} /></span> Sábado, 7 de Junho de 2025 - 19h
        </p>
        <p>
          <span className={styles.icon}><FontAwesomeIcon icon={info[1][0]} className={info[1][1]} /></span> Freje - Recife Antigo
        </p>
        <p>{ticket.mesa}x Mesa para 4 pessoas + {ticket.ingresso}x Ingresso Individual</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.download} onClick={downloadTicket}><FontAwesomeIcon icon={info[3][0]} className={info[3][1]} /> Baixar</button>
        <button className={styles.email} onClick={() => sendTicketByEmail(cliente.data.email)}><FontAwesomeIcon icon={info[4][0]} className={info[4][1]} /> Enviar por email</button>
        <button className={styles.share} onClick={shareTicket}><FontAwesomeIcon icon={info[5][0]} className={info[5][1]} /> Compartilhar</button>
      </div>
    </div>
  );
};

export default Index;
