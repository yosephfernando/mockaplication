const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})
connection.connect()
const mapHelper = require('../helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        let queryString = "SELECT * from users"
        if(userId) queryString = `SELECT * from users where id_user=${userId}`
        let resQuery = []
        connection.query(queryString, (err, rows, fields) => {
            if (err) throw reject(err)
            for(let i = 0;i<rows.length;i++){
                let items = mapHelper.mapData(rows[i])
                resQuery.push(items)
            }
            resolve(resQuery)
        })
    })
}

const createUser = (params) => {
    return new Promise((resolve, reject) => {
        if (mapHelper.validateCreateUser(params) == false){
            reject({"message":"Invalid parameter"})
        }else{
            bcrypt.hash(params.password, 10, function(err, hash) {
                let queryString = `INSERT INTO users (email, role, password) VALUES ('${params.email}', '${params.role}', '${hash}')`
                connection.query(queryString, (err, result, fields) => {
                    if (err){
                        reject({"message":err.message})
                    }else{
                        console.log("Number of rows affected : " + result.affectedRows);
                        console.log("Number of records affected with warning : " + result.warningCount);
                        console.log("Message from MySQL Server : " + result.message);
                        resolve(result.affectedRows)
                    }
                })
            })
        }
    })
}

const authUser = (params) => {
    return new Promise((resolve, reject) => {
        if (!mapHelper.validateAuth(params)) reject({"message": "Invalid param"})
        queryString = `SELECT id_user, email, password, role from users where email='${params.username}'`
        connection.query(queryString, (err, rows, fields) => {
            if (err){
                reject(err)
            }else{
                if(rows.length !== 0){
                    let items = mapHelper.mapData(rows[0])
                    bcrypt.compare(params.password, items.password, function(err, result) {
                        if (err) reject({"message": err.message})

                        let token = jwt.sign(items, 'ysp10997');

                        if(result){
                            resolve(token)
                        }else{
                            reject({"message": "Credential is not valid"})
                        }
                    })
                }else{
                    reject({"message": "Credential is not valid"})
                }
            }
        })
    })
}

module.exports = {
    getUser: getUser,
    createUser: createUser,
    authUser: authUser
}