
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Roboto, Chau_Philomene_One} from 'next/font/google'

import { ContextoProvider } from "@/context/contexto";

import Header from "@/components/saojoao/1 - others/header"
import Footer from "@/components/saojoao/1 - others/footer"

export const metadata = {
  title: "Camarote - Se vc não for eu vou",
  description: 'Curta o carnaval no camarote "Se Você Não For Eu Vou" no Galo da Madrugada! Shows de Chicadan, Faringes da Paixão e Patusco com muita música e alegria!',
  keywords: "Camarote, ingresso, Se vc não for eu vou, carnaval Recife, camarote Galo da Madrugada, Se Você Não For Eu Vou, Chicadan, Faringes da Paixão, Patusco, carnaval 2025, camarote premium Recife, festas de carnaval Recife, atrações Galo da Madrugada",
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

        <Header />
        <body className={chau_Philomene_One.className}>
          {children}
        </body>
        <Footer />

      </ContextoProvider> 

    </html>
  );
}
