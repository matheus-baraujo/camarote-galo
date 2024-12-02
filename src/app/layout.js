
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Joti_One , Roboto} from 'next/font/google'

export const metadata = {
  title: "Camarote - Se vc não for eu vou",
  description: 'Curta o carnaval no camarote "Se Você Não For Eu Vou" no Galo da Madrugada! Shows de Chicadan, Faringes da Paixão e Patusco com muita música e alegria!',
  keywords: "Camarote, ingresso, Se vc não for eu vou, carnaval Recife, camarote Galo da Madrugada, Se Você Não For Eu Vou, Chicadan, Faringes da Paixão, Patusco, carnaval 2025, camarote premium Recife, festas de carnaval Recife, atrações Galo da Madrugada",
};

const jotiOne = Joti_One({
  weight: '400',
  subsets: ['latin'],
})

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={roboto.className}>
        <div style={{overflowX: 'clip', position:'relative'}}>
          <div style={{backgroundColor: 'rgba(224, 215, 223, 0.6)', position: 'absolute', width:'100%', height:'100%', zIndex:'-2'}}></div>
          {children}
        </div>
      </body>
    </html>
  );
}
