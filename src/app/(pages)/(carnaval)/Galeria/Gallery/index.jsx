import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import Image from 'next/image'; // Certifique-se de importar o `next/image`

const CustomImageRenderer = ({ photo, imageProps }) => {
  return (
    <Image
      src={photo.src} // URL da imagem
      alt={photo.alt || ''}
      width={photo.width} // Largura definida no array de fotos
      height={photo.height} // Altura definida no array de fotos
      placeholder="blur" // Ativa o placeholder blur (opcional)
      blurDataURL={photo.blurDataURL} // Versão de baixa qualidade (opcional)
      quality={75} // Qualidade da imagem
      {...imageProps} // Props adicionais fornecidas pelo react-photo-album
    />
  );
};

const INITIAL_LOAD = 15; // Quantidade de imagens para o carregamento inicial
const PAGE_SIZE = 10;    // Quantidade de imagens para carregamentos subsequentes

const Gallery = (props) => {
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const loadMoreRef = useRef(null);

  // Inicializa o estado com as primeiras `INITIAL_LOAD` imagens
  useEffect(() => {
    setVisiblePhotos(props.imagens.slice(0, INITIAL_LOAD));
  }, [props.imagens]);

  // Configura o observer para carregar mais imagens
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 1.0,
        rootMargin: '100px 0px',
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visiblePhotos]);

  const loadMore = () => {
    const newPhotos = props.imagens.slice(
      visiblePhotos.length,
      visiblePhotos.length + PAGE_SIZE
    );
    setVisiblePhotos((prev) => [...prev, ...newPhotos]);
  };

  return (
    <div style={{ margin: 'auto' }}>
      <MasonryPhotoAlbum
        photos={visiblePhotos}
        columns={3}
        padding={5}
        spacing={15}
        sizes={{
          size: '1168px',
          sizes: [
            {
              viewport: '(max-width: 1200px)',
              size: 'calc(100vw - 32px)',
            },
          ],
        }}
        renderPhoto={CustomImageRenderer}
        onClick={({ event, photo }) => {
          if (event.shiftKey || event.altKey || event.metaKey) return;

          event.preventDefault();
          setLightboxPhoto(photo);
        }}
      />

      {/* Div para carregar mais fotos ao chegar ao final */}
      {visiblePhotos.length < props.imagens.length && (
        <div
          ref={loadMoreRef}
          style={{ height: '20px', background: 'transparent' }}
        />
      )}

      <Lightbox
        open={Boolean(lightboxPhoto)}
        close={() => setLightboxPhoto(null)}
        slides={lightboxPhoto ? [lightboxPhoto] : undefined}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(0, 0, 0, .8)' } }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullUp: true,
          closeOnPullDown: true,
        }}
      />
    </div>
  );
};

export default Gallery;

