import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate, Link  } from "react-router-dom";
const apiUrl = "http://localhost:8181/user/auth"

export default function Login(){
    const[credential, setCred] = useState({
        "username": "",
        "password": ""
    })
    const[message, setMessage] = useState("")

    const handleLogin = (event) => {
        if(event.target.name === "email") credential.username = event.target.value
        if(event.target.name === "password") credential.password = event.target.value
        setCred(credential)
    }

    const signIn = () => {
        fetch(apiUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(credential) 
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 200){
                localStorage.setItem("token", data.token)
                window.location.reload()
            }else{
                setMessage(data.message)
            }
        })
    }

    return(
        <div className={'mt-3'}>
            <Row className='mt-5 justify-content-center'>
                <Col lg={4}>
                    <h3 className='text-center'>Sign In</h3>
                    {(message !== "" ? <Alert variant="info"><b>{message}</b></Alert> : "")}
                    <Col>
                        <Col>
                            <Form.Label htmlFor="username">email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                id="username"
                                onChange={(e) => handleLogin(e)}
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                name="password"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => handleLogin(e)}
                            />
                        </Col>
                        <Col className='d-flex mt-3 justify-content-between'>
                            <Link to="/register">Sign up</Link>
                            <Button onClick={() => signIn()}>Sign in</Button>
                        </Col>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}