import React, { useState } from 'react'
import styles from './styles.module.css'

import { MasonryPhotoAlbum  } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const index = (props) => {

  const [open, setOpen] = useState(false);

  const [lightboxPhoto, setLightboxPhoto] = useState();

  return (
    <div style={{ margin:'auto'}}>
      <MasonryPhotoAlbum  
        photos={props.imagens} 
        columns={3} 
        padding={5}  
        spacing={15}  
        sizes={{
          size: "1168px",
          sizes: [
            {
              viewport: "(max-width: 1200px)",
              size: "calc(100vw - 32px)",
            },
          ],
        }}
        onClick={({ event, photo }) => {
          // let a link open in a new tab / new window / download
          if (event.shiftKey || event.altKey || event.metaKey) return;

          // prevent the default link behavior
          event.preventDefault();

          // open photo in a lightbox
          setLightboxPhoto(photo);
        }}
      />


      <Lightbox
        open={Boolean(lightboxPhoto)}
        close={() => setLightboxPhoto(undefined)}
        slides={lightboxPhoto ? [lightboxPhoto] : undefined}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        controller={{ closeOnBackdropClick: true, closeOnPullUp: true, closeOnPullDown: true }}
      />
    </div>
  )
}

export default index