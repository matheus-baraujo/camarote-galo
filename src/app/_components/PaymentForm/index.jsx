import React from 'react'
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'
import FormGroup from './FormGroup'

const index = () => {
  return (
    <Form>
      <FormGroup type={0}/>
      <FormGroup type={1}/>
      <FormGroup type={2}/>
      <FormGroup type={3}/>
    </Form>
  )
}

export default index