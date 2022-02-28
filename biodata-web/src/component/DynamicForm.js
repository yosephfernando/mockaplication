import React, { useState } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";

export default function DynamicForm(props){
    const [form, setForm] = useState(props.form)
    
    const handleForm = (event, id) => {
        let formData = form
        for(let i = 0;i<formData.length;i++){
            if(formData[i].type !== "form"){
                if(formData[i].formLabel === event.target.name){
                    formData[i].value = event.target.value
                    if(formData[i].regex !== undefined){
                        if(formData[i].value.match(formData[i].regex) === null){
                            formData[i].message = "Tolong isi dengan format yang sesuai"
                        }else{
                            formData[i].message = ""
                        }
                    }else{
                        if(formData[i].value !== ""){
                            formData[i].message = ""
                        }else{
                            formData[i].message = "Kolom wajib diisi"
                           
                        }
                    }
                }
            }else{
                if(formData[i].items[id] !== undefined){
                    for(let j = 0;j<formData[i].items[id].forms.length;j++){
                        if(formData[i].items[id].forms[j].formLabel === event.target.name){
                            formData[i].items[id].forms[j].value = event.target.value
                            if(formData[i].items[id].forms[j].regex !== undefined){
                                if(formData[i].items[id].forms[j].value.match(formData[i].items[id].forms[j].regex) === null){
                                    formData[i].items[id].forms[j].message = "Tolong isi dengan format yang sesuai"
                                }else{
                                    formData[i].items[id].forms[j].message = ""
                                }
                            }else{
                                if(formData[i].items[id].forms[j].value !== ""){
                                    formData[i].items[id].forms[j].message = ""
                                }else{
                                    formData[i].items[id].forms[j].message = "Kolom wajib diisi"
                                }
                            }
                        }
                    }
                }
            }
            validateChildForm(i)
        }
 
        if(event.target.name === "button"){
            let selectedIndex = 0
            for(let i = 0;i<formData.length;i++){
                if(formData[i].formLabel === id){
                    selectedIndex = i
                    break
                }
            }

            let newChild = props.child[id].forms.map(a => ({...a}));
            newChild.map(item => {
                item.value = ""
            })
            let newForms = {"forms": []}
            newForms.forms = newChild

            formData[selectedIndex].items.push(newForms)
        }
        
        setForm([...formData])
    }

    const validateChildForm = (index) => {
        let disableButton = false
        if(form[index].type === "form"){
            for(let j = 0;j<form[index].items.length;j++){
                for(let k = 0;k<form[index].items[j].forms.length;k++){
                    if(form[index].items[j].forms[k].value === ""){
                        disableButton = true
                    }
                }
            }
            form[index].disableButton = disableButton
        }

        setForm([...form])
    }

    return (
        <>
            {(form.length > 0 ? form.map((item, index) => {
                if(item.type === "text"){
                    return (
                        <Col key={index+1} className='mt-2'>
                            <Form.Label htmlFor={item.formLabel}>{item.formLabel}</Form.Label>
                            {(item.message !== "" ? <p style={{color: "red"}}>{item.message}</p>:"")}
                            <Form.Control
                                type={item.type}
                                id={item.formLabel}
                                name={item.formLabel}
                                onChange={(e) => handleForm(e)}
                            />
                        </Col>
                    )
                }else if(item.type === "textarea"){
                    return (
                        <Col key={index+1} className='mt-2'>
                            <Form.Label htmlFor={item.formLabel}>{item.formLabel}</Form.Label>
                            {(item.message !== "" ? <p style={{color: "red"}}>{item.message}</p>:"")}
                            <Form.Control
                                as="textarea" rows={3}
                                id={item.formLabel}
                                name={item.formLabel}
                                onChange={(e) => handleForm(e)}
                            />
                        </Col>
                    )
                }else if(item.type === "select"){
                    return (
                        <Col key={index+1} className='mt-2'>
                            <Form.Label htmlFor={item.formLabel}>{item.formLabel}</Form.Label>
                            {(item.message !== "" ? <p style={{color: "red"}}>{item.message}</p>:"")}
                            <Form.Select aria-label="" name={item.formLabel} onChange={(e) => handleForm(e)}>
                                <option value="">pilih salah satu</option>
                                {item.items.map((optionItem, index) => {
                                    return (
                                        <option key={index+1} value={optionItem}>{optionItem}</option>
                                    )
                                })}
                            </Form.Select>
                        </Col>
                    )
                }else if(item.type === "form"){
                    return (
                        <Col className='mt-2' key={index+1}>
                            <Col>
                                <Form.Label htmlFor={item.formLabel}>{item.formLabel}</Form.Label>
                            </Col>
                            <Row>
                                {(item.items.map((formItem, index) => {
                                    return (
                                        formItem.forms.map((formsField, indexField) => {
                                            if(formsField.type !== "select"){
                                                return (
                                                    <Col key={indexField+1} lg={12}>
                                                        <Form.Label htmlFor={formsField.formLabel}>{formsField.formLabel}</Form.Label>
                                                        {(formsField.message !== "" ? <p style={{color: "red"}}>{formsField.message}</p>:"")}
                                                        <Form.Control
                                                            type={formsField.type}
                                                            name={formsField.formLabel}
                                                            onChange={(e) => handleForm(e, index)}
                                                        />
                                                    </Col>
                                                )
                                            }else{
                                                return (
                                                    <Col key={indexField+1} lg={6}>
                                                        <Form.Label htmlFor={formsField.formLabel}>{formsField.formLabel}</Form.Label>
                                                        {(formsField.message !== "" ? <p style={{color: "red"}}>{formsField.message}</p>:"")}
                                                        <Form.Select aria-label=""  name={formsField.formLabel} onChange={(e) => handleForm(e, index)}>
                                                            <option value="">pilih salah satu</option>
                                                            {formsField.items.map((optionItem, index) => {
                                                                return (
                                                                    <option key={index+1} value={optionItem}>{optionItem}</option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                    </Col>
                                                )
                                            }
                                        })
                                    )
                                }))}
                                <Col lg={12}>
                                    <Row className="my-3">
                                        {(item.disableButton === true ? <Button name="button" disabled variant="success" onClick={(e) => handleForm(e, item.formLabel)}>Tambah {item.formLabel}</Button>:<Button name="button" variant="success" onClick={(e) => handleForm(e, item.formLabel)}>Tambah {item.formLabel}</Button>)}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    )
                }
            }):"")}
            <Col>
                <Button className='mt-3' onClick={() => props.submit(form)}>Save</Button>
            </Col>
        </>
    )
}