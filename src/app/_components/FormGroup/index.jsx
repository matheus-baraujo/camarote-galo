'use client'

import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css'

const index = (props) => {

    const types = [["Nome Completo", "text",''],["Email", "email",'example@email.com'],["Confirmar Email", "confirmarEmail",'example@email.com'],["CPF", "text",'xxx.xxx.xxx-xx'],["Quantidade", "number",'1'],["Senha", "password",''],["Usuário", "text",'']];

    var aux = '';

    if(props.type == 5){
        aux = <Form.Control type={types[props.type][1]} placeholder={types[props.type][2]} value={props.valor} onChange={(ev) => props.setting(ev.target.value)}/>;
    }else if(props.type == 3){
        aux = <Form.Control type={types[props.type][1]} placeholder={types[props.type][2]} maxLength='14' value={props.valor} onChange={(ev) => props.setting(ev.target.value)}/>;
    }else if(props.type != 4){
        aux = <Form.Control type={types[props.type][1]} placeholder={types[props.type][2]} value={props.valor} onChange={(ev) => props.setting(ev.target.value)}/>;
    }else{
        aux = <Form.Control type={types[props.type][1]} min={1} placeholder={types[props.type][2]} value={props.valor} onChange={(ev) => props.setting(parseInt(ev.target.value))}/>;
    }

    return (
        <Form.Group className="mb-3" controlId={"label "+types[props.type][0]}>
            <Form.Label className={styles.label}>{types[props.type][0]}</Form.Label>
            {
                aux
            }
            <Form.Label className={styles.error}>{props.error}</Form.Label>
        </Form.Group>
    )
}

export default index