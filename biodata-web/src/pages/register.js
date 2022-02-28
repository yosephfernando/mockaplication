import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const apiUrl = "http://localhost:8181/user"

export default function Register(){
    const navigate = useNavigate()
    const [user, setUser] = useState({
        "email": "",
        "password": "",
        "role": "user"
    })

    const [message, setMessage] = useState("")

    const hanldeChange = (e) => {
        user[e.target.name] = e.target.value
        setUser(user)
    }

    const signup = () => {
        console.log(user)
        fetch(apiUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(user) 
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 200){
                setMessage(data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }else{
                setMessage(data.message)
            }
        })
    }
    return(
        <div className={'mt-3'}>
            <Row className='mt-5 justify-content-center'>
                <Col lg={4}>
                    <Col>
                        <h3 className='text-center'>Sign Up</h3>
                        {(message !== "" ? <Alert variant="info"><b>{message}</b></Alert> : "")}
                        <Col>
                            <Form.Label htmlFor="username">email</Form.Label>
                            <Form.Control
                                type="email"
                                id="username"
                                name="email"
                                onChange={(e) => hanldeChange(e)}
                            />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                name="password"
                                onChange={(e) => hanldeChange(e)}
                            />
                        </Col>
                        <Col className='d-flex mt-3 justify-content-between'>
                            <b style={{cursor: "pointer"}} onClick={() => navigate("/login")}>Back to sign in page</b>
                            <Button onClick={() => signup()}>Sign up</Button>
                        </Col>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}