import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const index = (props) => {
  const [data, setData] = useState([]);

  
  return (
    <Form>

      <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
            <Form.Control type={'text'} placeholder={'login'}  id='login' onChange={(ev) => props.setLogin(ev.target.value)}/>
          <Form.Label>{props.loginError}</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
            <Form.Control type={'password'} placeholder={'senha'}  id='senha' onChange={(ev) => props.setSenha(ev.target.value)}/>
          <Form.Label>{props.senhaError}</Form.Label>
      </Form.Group>

      <Button 
        onClick={props.logar} 
        style={{width: '50%', margin: 'auto 25%'}}>
        Acessar
      </Button>

    </Form>
  )
}

export default index