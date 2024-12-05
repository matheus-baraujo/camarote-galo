import React, { useState } from 'react'
import styles from './styles.module.css'

import Carousel from 'react-bootstrap/Carousel';

const index = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  var videos = []
  for (let index = 1; index < 13; index++) {
    let source = '/videos/video ('+index+').mp4'
    videos.push(source)
  }

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className={styles.Carousel}>
        
        {
          videos.map((item)=>{
            return(
              <Carousel.Item className={styles.item}>
                <div className={styles.videoContainer}>
                  <video className={styles.video} controls >
                    <source src={item} type="video/mp4"/>
                  </video>
                </div>
              </Carousel.Item>
            )})
        }
        
      </Carousel>
    </>
  )
}

export default index