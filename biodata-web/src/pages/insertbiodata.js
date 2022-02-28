import React, { useState } from 'react';
import DynamicForm from '../component/DynamicForm'
import { Row, Col, Alert } from "react-bootstrap";
const apiUrl = "http://localhost:8181/biodata"

export default function EntryBiodata(){ 
    const children = {
        "Riwayat pekerjaan": {
            "forms": [
                {
                    "formLabel": "Nama perusahaan",
                    "dataLabel": "nama",
                    "value": "",
                    "message": "",
                    "type": "text",
                },
                {
                    "formLabel": "Posisi terakhir",
                    "dataLabel": "posisi",
                    "value": "",
                    "message": "",
                    "type": "text",
                },
                {
                    "formLabel": "Pendapatan terakhir",
                    "dataLabel": "pendapatan",
                    "value": "",
                    "regex": /^(0|[1-9][0-9]*)$/,
                    "message": "",
                    "type": "text",
                },
                {
                    "formLabel": "Tahun selesai bekerja",
                    "dataLabel": "tahun",
                    "value": "",
                    "regex": /^\d{4}$/,
                    "message": "",
                    "type": "text",
                }
            ]
        },
        "Pendidikan Terakhir": {
            "forms": [
                {
                    "formLabel": "Jenjang pendidikan terakhir",
                    "dataLabel": "jenjang",
                    "value": "",
                    "regex": /^[A-Za-z-0-9]{1,4}$/,
                    "message": "Kolom wajib diisi",
                    "type": "text",
                },
                {
                    "formLabel": "Nama institusi",
                    "dataLabel": "nama_institusi",
                    "value": "",
                    "message": "Kolom wajib diisi",
                    "type": "text",
                },
                {
                    "formLabel": "Jurusan",
                    "dataLabel": "jurusan",
                    "value": "",
                    "message": "Kolom wajib diisi",
                    "type": "text",
                },
                {
                    "formLabel": "Tahun lulus",
                    "dataLabel": "tahun_lulus",
                    "value": "",
                    "regex": /^\d{4}$/,
                    "message": "Kolom wajib diisi",
                    "type": "text",
                },
                {
                    "formLabel": "IPK",
                    "dataLabel": "ipk",
                    "value": "",
                    "regex": /[+-]?([0-9]*[.])?[0-9]+/,
                    "message": "Kolom wajib diisi",
                    "type": "text",
                }
            ]
        },
        "Riwayat pelatihan": {
            "forms": [
                {
                    "formLabel": "Nama kursus",
                    "dataLabel": "nama",
                    "value": "",
                    "message": "",
                    "type": "text",
                },
                {
                    "formLabel": "Sertifikat",
                    "dataLabel": "sertifikat",
                    "value": "",
                    "message": "",
                    "type": "select",
                    "items": [
                        "ADA",
                        "TIDAK"
                    ]
                },
                {
                    "formLabel": "Tahun ikut pelatihan",
                    "dataLabel": "tahun",
                    "value": "",
                    "regex": /^\d{4}$/,
                    "message": "",
                    "type": "text",
                }
            ]
        }
    }

    const form = [
        {
            "formLabel": "Nama",
            "dataLabel": "nama",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "Posisi yang dilamar",
            "dataLabel": "posisi_dilamar",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "No KTP",
            "dataLabel": "no_ktp",
            "value": "",
            "message": "Kolom wajib diisi",
            "regex": /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/,
            "type": "text"
        },
        {
            "formLabel": "Tempat lahir",
            "dataLabel": "tempat_lahir",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "Tanggal lahir ( yyyy-mm-dd )",
            "dataLabel": "tanggal_lahir",
            "value": "",
            "regex": /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "Agama",
            "dataLabel": "agama",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "select",
            "items": [
                "ISLAM",
                "KRISTEN",
                "KATHOLIK",
                "BUDHA",
                "HINDU",
            ]
        },
        {
            "formLabel": "Golongan Darah",
            "dataLabel": "golongan_darah",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "select",
            "items": [
                "A",
                "B",
                "AB",
                "O",
            ]
        },
        {
            "formLabel": "Status pernikahan",
            "dataLabel": "status_pernikahan",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "select",
            "items": [
                "SUDAH",
                "BELUM",
                "JANDA",
                "DUDA"
            ]
        },
        {
            "formLabel": "Alamat KTP",
            "dataLabel": "alamat_ktp",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "textarea"
        },
        {
            "formLabel": "Alamat tempat tinggal",
            "dataLabel": "alamat_tempat_tinggal",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "textarea"
        },
        {
            "formLabel": "Email",
            "dataLabel": "email",
            "value": "",
            "regex": /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "No telpon",
            "dataLabel": "no_telp",
            "value": "",
            "regex": /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "Orang terdekat yang dapat dihubungi",
            "dataLabel": "emergency_contact",
            "value": "",
            "regex": /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            "message": "Kolom wajib diisi",
            "type": "text"
        },
        {
            "formLabel": "Pendidikan Terakhir",
            "value": "",
            "dataLabel": "pendidikan",
            "type": "form",
            "disableButton": true,
            "items": [
                children["Pendidikan Terakhir"]
            ]
        },
        {
            "formLabel": "Riwayat pelatihan",
            "value": "",
            "dataLabel": "pelatihan",
            "type": "form",
            "disableButton": true,
            "items": [
                children["Riwayat pelatihan"]
            ]
        },
        {
            "formLabel": "Riwayat pekerjaan",
            "value": "",
            "dataLabel": "pekerjaan",
            "type": "form",
            "disableButton": true,
            "items": [
                children["Riwayat pekerjaan"]
            ]
        },
        {
            "formLabel": "Skill",
            "dataLabel": "skils",
            "message": "Kolom wajib diisi",
            "value": "",
            "type": "textarea"
        },
        {
            "formLabel": "Bersedia ditempatkan diluar kota",
            "dataLabel": "bersedia_ditempatkan",
            "value": "",
            "message": "Kolom wajib diisi",
            "type": "select",
            "items": [
                "YA",
                "TIDAK"
            ]
        },
        {
            "formLabel": "Penghasilan yang diharapkan",
            "dataLabel": "penghasilan_diharapkan",
            "message": "Kolom wajib diisi",
            "value": "",
            "regex": /^(0|[1-9][0-9]*)$/,
            "type": "text"
        },

    ]

    const[message, setMessage] = useState("")

    const validateForm = (data) => {
        for(let i=0;i<data.length;i++){
            if(data[i].type === "form"){
                for(let j = 0;j<data[i].items.length;j++){
                    for(let k = 0;k<data[i].items[j].forms.length;k++){
                        if(data[i].items[j].forms[k].message === ""){
                            return true
                         }
                    }
                }
            }else{
                if(data[i].message === ""){
                    return true
                }
            }
        }
        return false
    }

    const handleSubmit = (data) => {
        let mapped = {}
        if(validateForm(data) === true){
            for(let i=0;i<data.length;i++){
                if(data[i].type === "form"){
                    mapped[data[i].dataLabel] = []
                    for(let j = 0;j<data[i].items.length;j++){
                        let item = {}
                        for(let k = 0;k<data[i].items[j].forms.length;k++){
                            if(data[i].items[j].forms[k].value !== ""){
                                item[data[i].items[j].forms[k].dataLabel] = data[i].items[j].forms[k].value
                            }
                        }
                        if(Object.keys(item).length !== 0){
                            mapped[data[i].dataLabel].push(item)
                        }
                    }
                }else{
                    mapped[data[i].dataLabel] = data[i].value
                }
            }

            fetch(apiUrl, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(mapped) 
            }).then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    setMessage("Data berhasil diinput")
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000)
                }else{
                    setMessage("Data gagal diinput, pastikan data sudah sesuai")
                }
            })
        }
    }

    return(
        <div className={'mt-3'}>
            <Row className='my-5 justify-content-center'>
                <Col lg={9}>
                    <h3 className='text-center'>Silahkan isi dengan data anda</h3>
                    {(message !== "" ? <Alert variant="info"><b>{message}</b></Alert> : "")}
                    <DynamicForm 
                        form={form} 
                        child={children} 
                        submit={handleSubmit} 
                    />
                    {(message !== "" ? <Alert variant="info"><b>{message}</b></Alert> : "")}
                </Col>
            </Row>
        </div>
    )
}