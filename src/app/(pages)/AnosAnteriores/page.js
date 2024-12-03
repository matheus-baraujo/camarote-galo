'use client'

import { useEffect, useState } from "react";

import styles from './page.module.css'

import { Container, Row, Col } from "react-bootstrap";

import BackgroundAssets from '../../_components/BackgroundAssets'
import StyledButton from '../../_components/StyledButton'

export default function AnosAnteriores() {

  return(
    <>
      <Container fluid="sm" style={{position: 'relative', minHeight: '100vh', alignContent:'center'}}>
        <Row className='px-3 px-md-5' style={{margin: 'auto auto 50px'}}>
          <Col xs={12} md={6} style={{margin:'auto'}}>
            <h1 className={styles.title}>Anos Anteriores</h1>
          </Col>
        </Row>

        
      </Container>

      <BackgroundAssets />
    </>
  );
}