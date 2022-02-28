require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const users = require('./tables/users')
const bios = require('./tables/biodata')
const pendidikan = require('./tables/pendidikanTerakhir')
const pekerjaan = require('./tables/riwayatPekerjaan')
const pelatihan = require('./tables/riwayatPelatihan')
const mapHelper = require('./helper')
const bodyParser = require('body-parser')
const cors = require('cors')
const authtoken = require('./customMiddleware')

app.use(cors())
app.use(bodyParser.json())


app.get('/user', authtoken, async (req, res) => {
    let usersData = await users.getUser(req.user.id_user).catch(err => {
        res.json({"status":500, "message": err.message})
    })
 
    res.json({"data": usersData}).status(200)
})

app.post('/user', (req, res) => {
    let params = req.body
    let response = {}
    users.createUser(params).then((responseData) => {
        if(responseData == 0 || responseData == undefined){
            response["status"] = 500
        }else{
            response["status"] = 200
        }
        response["message"] = `Affected rows ${responseData}`
    }).catch(err => {
        response["status"] = 500
        response["message"] = err.message
    }).finally(() => {
        res.json(response).status(response.status)
    })
})

app.post('/user/auth', (req, res) => {
    let params = req.body
    let response = {}
    users.authUser(params).then((responseAuth) => {
        response["status"] = 200
        response["token"] = responseAuth
    }).catch(err => {
        response["status"] = 500
        response["message"] = err.message
    }).finally(() => {
        res.json(response).status(response.status)
    })
})

app.get('/biodata', authtoken, async (req, res) => {
    let response = {}
    let responseData = []
    let biodata = await bios.getBioData(req.user.id_user).catch(err => {
        response["status"] = 500
        response["message"] = err.message
    })
    let mappedProm =  new Promise((resolve, reject) => {
        biodata.forEach(item => {
            let promPendidikan = new Promise((resolve, reject) => {
                let pendidikanArr = []
                pendidikan.getRiwayatByBioID(item.id_biodata)
                .then(pendidikanRes => {
                    pendidikanRes.map(element => {
                        pendidikanArr.push(element)
                    });
                    resolve(pendidikanArr)
                }).catch(err => {
                    response["status"] = 500
                    response["message"] = err.message
                    reject(response)
                })
            })
            
            let promPekerjaan = new Promise((resolve, reject) => {
                pekerjaan.getRiwayatPekerjaanByBioID(item.id_biodata)
                .then(pekerjaanRes => {
                    let pekerjaanArr = []
                    pekerjaanRes.forEach(element => {
                        pekerjaanArr.push(element)
                    });
                    resolve(pekerjaanArr)
                }).catch(err => {
                    response["status"] = 500
                    response["message"] = err.message
                    reject(response)
                })
            })
    
            let pelatihanData = new Promise((resolve, reject) => {
                pelatihan.getRiwayatPelatihanByBioID(item.id_biodata)
                .then(pelatihanRes => {
                    let pelatihanArr = []
                    pelatihanRes.forEach(element => {
                        pelatihanArr.push(element)
                    });
                    resolve(pelatihanArr)
                }).catch(err => {
                    response["status"] = 500
                    response["message"] = err.message
                })
            })
            
            Promise.all([promPendidikan, promPekerjaan, pelatihanData]).then(values => {
                item["pendidikan"] = values[0]
                item["pekerjaan"] = values[1]
                item["pelatihan"] = values[2]
                responseData.push(item)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                if(responseData.length == biodata.length) resolve(responseData)
            });
        })
    })

    mappedProm.then(mapped => {
        if(mapped.length > 1){
            response["data"] = mapped
            response["status"] = 200
        }else if(mapped.length == 1){
            response["data"] = mapped[0]
            response["status"] = 201
            response["message"] = "No data found"
        }else{
            response["data"] = []
            response["status"] = 201
            response["message"] = "No data found"
        }
    }).finally(() => {
        res.json(response)
    })
})

app.post('/biodata', authtoken, (req, res) => {
    let response = {}
    let params = req.body
    params["id_user"] = req.user.id_user
    response["status"] = 500
    response["message"] = "invalid parameter"

    if(mapHelper.validateCreateBio(params) == false){
        response["message"] = "invalid data pribadi parameter"
        return res.json(response)
    }
    
    bios.saveBioData(params)
    .then((responseData) => {
        if(responseData == 0 || responseData == undefined){
            response["status"] = 500
            response["message"] = "invalid parameter"
            return res.json(response).status(response.status)
        }else{
            console.log("biodata id", responseData)
            if(mapHelper.validateCreatePekerjaan(params["pekerjaan"]) == false){
                response["message"] = "invalid pekerjaan parameter"
                return res.json(response)
            }
            
            if(mapHelper.validateCreatePelatihan(params["pelatihan"]) == false){
                response["message"] = "invalid pelatihan parameter"
                return res.json(response)
            }
            
            if(mapHelper.validateCreatePendidikan(params["pendidikan"]) == false){
                response["message"] = "invalid pendidikan parameter"
                return res.json(response)
            }

            let pendidikanSave = new Promise(async (resolve, reject) => {
                let saved = await pendidikan.savePendidikan(params["pendidikan"], responseData).catch(err => {
                    reject(err.message)
                })
                resolve(saved)
            })

            let pekerjaanSave = new Promise(async (resolve, reject) => {
                let saved = await pekerjaan.savePekerjaan(params["pekerjaan"], responseData).catch(err => {
                    reject(err.message)
                })
                resolve(saved)
            })

            let pelatihanSave = new Promise(async (resolve, reject) => {
                let saved = await pelatihan.savePelatihan(params["pelatihan"], responseData).catch(err => {
                    reject(err.message)
                })
                resolve(saved)
            })

            let promises = [pendidikanSave]
            if(params["pekerjaan"].length > 0){
                promises.push(pekerjaanSave)
            }

            if(params["pelatihan"].length > 0){
                promises.push(pelatihanSave)
            }

            Promise.all(promises).then(responseSave => {
                response["status"] = 200
                response["message"] = responseSave
            }).finally(() => {
                res.json(response).status(response.status)
            })
        }
        response["message"] = `Affected rows ${responseData}`
    }).catch(err => {
        response["status"] = 500
        response["message"] = err.message
        res.json(response).status(response.status)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})