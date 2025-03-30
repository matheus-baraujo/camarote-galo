import React from 'react'

import Banner from './0 - banner'
import BannerCTA from './1 - bannerCTA'
import Informacoes from './2 - informacoes'
import Atracoes from './3 - atracoes'
import Localizacao from './4 - localizacao'
import Ingressos from './5 - ingressos'


import styles from './styles.module.css'

const index = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Banner />
        <BannerCTA />
        <Informacoes />
        <Atracoes />
        <Localizacao />
        <Ingressos />
      </div>
    </>
  )
}

export default index