
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Roboto, Chau_Philomene_One} from 'next/font/google'

import { ContextoProvider } from "@/context/contexto";

import Header from "@/components/saojoao/1 - others/header"
import Footer from "@/components/saojoao/1 - others/footer"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Se vc não for eu vou - São Joao",
  description: 'Curta o são joão no "Se Você Não For Eu Vou" ! Shows de Chicadan, As Januárias, Vera Freitase  e Tomá Henrique!',
  keywords: "Camarote, ingresso, Se vc não for eu vou, são joão Recife, Se Você Não For Eu Vou, Chicadan, As Januárias, Vera Freitase, Tomá Henrique, são joão 2025, festas de são joão Recife, atrações são joão",
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const chau_Philomene_One = Chau_Philomene_One({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {

  return (
    <html lang="en" >

      <ContextoProvider>    

        
        <body className={chau_Philomene_One.className}>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </body>
        

      </ContextoProvider> 

    </html>
  );
}
