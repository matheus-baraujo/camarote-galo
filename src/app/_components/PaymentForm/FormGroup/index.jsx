import React from 'react'
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'

const index = (props) => {

    const types = [["Nome", "text",''],["Email", "email",'example@email.com'],["CPF", "text",'xxx.xxx.xxx-xx'],["Quantidade", "number",'1']];

    return (
        <Form.Group className="mb-3" controlId={"label "+types[props.type][0]}>
            <Form.Label>{types[props.type][0]}</Form.Label>
            <Form.Control type={types[props.type][1]} placeholder={types[props.type][2]} />
        </Form.Group>
    )
}

export default index