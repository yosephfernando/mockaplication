import React, { useState, useEffect } from 'react';
import { Row, Table, Button, Modal, Form, Col  } from "react-bootstrap";
const apiUrl = "http://localhost:8181/biodata"

export default function UsersData(){
    const [biodata, setBiodata] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true);
        setSelected(item);
    }

    const handleSearch = (e) => {
        if(e.target.name === "keyword"){
            fetch(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => res.json())
            .then(response => {
                if(response.status === 200){
                    let result = []
                    if(e.target.value.length >= 1){
                        result = response.data.filter(item => {
                            if(item.nama.match(e.target.value)) return item
                        })
                        
                    }else if(e.target.value.length === 0){
                        result = response.data
                    }
                    console.log("result >>", result)
                    setBiodata([...result])
                }
            })
        }
    }


    useEffect(() => {
        if(loaded === false){
            fetch(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => res.json())
            .then(response => {
                if(response.status === 200){
                    setBiodata(response.data)
                    setLoaded(true)
                }
            })
        }
    }, [biodata])

    const OpenDetail = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selected.nama}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Data pribadi</h4>
                    <p>Posisi dilamar : <b>{selected.posisi_dilamar}</b></p>
                    <p>Agama : <b>{selected.agama}</b></p>
                    <p>Alamat ktp : <b>{selected.alamat_ktp}</b></p>
                    <p>Alamat tempat tinggal : <b>{selected.alamat_tempat_tinggal}</b></p>
                    <p>Bersedia ditempatkan : <b>{selected.bersedia_ditempatkan}</b></p>
                    <p>Golongan darah : <b>{selected.golongan_darah}</b></p>
                    <p>No KTP : <b>{selected.no_ktp}</b></p>
                    <p>No telp : <b>{selected.no_telp}</b></p>
                    <p>Penghasilan diharapkan : <b>{selected.penghasilan_diharapkan}</b></p>
                    <p>Skill : <b>{selected.skill}</b></p>
                    <p>Status perkawinan : <b>{selected.status_pernikahan}</b></p>
                    <p>Tanggal lahir : <b>{selected.tanggal_lahir}</b></p>
                    <p>Tempat lahir : <b>{selected.tempat_lahir}</b></p>
                    <p>Kontak orang terdekat : <b>{selected.emergency_contact}</b></p>
                    <h4>Data Pendidikan</h4>
                    {(selected.pendidikan !== undefined ? selected.pendidikan.map((item, index) => {
                        return(
                            <div key={index+1}>
                                <p>Jenjang: <b>{item.jenjang}</b></p>
                                <p>Nama institusi: <b>{item.nama_institusi}</b></p>
                                <p>Jurusan: <b>{item.jenjang}</b></p>
                                <p>Tahun lulus: <b>{item.jenjang}</b></p>
                                <hr></hr>
                            </div>
                        )
                    }):"")}
                    <h4>Pengalaman kerja</h4>
                    {(selected.pekerjaan !== undefined ? selected.pekerjaan.map((item, index) => {
                        return(
                            <div key={index+1}>
                                <p>Nama perusahan: <b>{item.nama}</b></p>
                                <p>Posisi terakhir: <b>{item.posisi}</b></p>
                                <p>Pendapatan terakhir: <b>{item.pendapatan}</b></p>
                                <p>Tahun selesai bekerja: <b>{item.tahun}</b></p>
                                <hr></hr>
                            </div>
                        )
                    }):"")}
                    <h4>Pelatihan</h4>
                    {(selected.pelatihan !== undefined ? selected.pelatihan.map((item, index) => {
                        return(
                            <div key={index+1}>
                                <p>Nama kursus: <b>{item.nama}</b></p>
                                <p>Sertifikat: <b>{item.sertifikat}</b></p>
                                <p>Tahun: <b>{item.tahun}</b></p>
                                <hr></hr>
                            </div>
                        )
                    }):"")}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>   
        )
    }
    return (
        <Row>
            <Col className='mt-5' lg={5} style={{paddingLeft: 0}}>
                <Form.Control type="text" name="keyword" onChange={(e) => handleSearch(e)} placeholder="cari berdasarkan nama"></Form.Control>
            </Col>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Usia</th>
                        <th>Posisi dilamar</th>
                        <th>Email</th>
                        <th>No telp</th>
                    </tr>
                </thead>
                <tbody>
                    {(biodata.length > 0 ? biodata.map((item, index) => {
                        return (
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{item.nama}</td>
                                <td>{((new Date().getFullYear()) - (new Date(item.tanggal_lahir).getFullYear()))}</td>
                                <td>{item.posisi_dilamar}</td>
                                <td>{item.email}</td>
                                <td>{item.no_telp}</td>
                                <td><Button onClick={() => handleShow(item)}>Detail</Button></td>
                            </tr>
                        )
                    }):"")}
                </tbody>
            </Table>  
            <OpenDetail  />  
             
        </Row>
    )
}