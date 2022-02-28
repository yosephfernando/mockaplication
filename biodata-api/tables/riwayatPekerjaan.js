const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})
connection.connect()
const mapHelper = require('../helper')

const getRiwayatPekerjaanByBioID = (bioID) => {
    return new Promise((resolve, reject) => {
        let queryString = `SELECT nama, posisi, pendapatan, tahun FROM riwayat_pekerjaan`
        if(bioID) queryString += ` where id_biodata=${bioID}`
        let resQuery = []
        connection.query(queryString, (err, rows, fields) => {
            if (err){
                reject(err)
            }else{
                for(let i = 0;i<rows.length;i++){
                    let items = mapHelper.mapData(rows[i])
                    resQuery.push(items)
                }
                resolve(resQuery)
            }
        })
    })
}

const savePekerjaan = (params, idBiodata) => {
    return new Promise((resolve, reject) => {
        if(params.length > 0){
            let queryString = mapHelper.generateInsertQuery(params, "riwayat_pekerjaan", idBiodata)
            connection.query(queryString, (err, result, fields) => {
                if (err){
                    reject({"message":err.message})
                }else{
                    console.log("Number of rows affected : " + result.affectedRows);
                    console.log("Number of records affected with warning : " + result.warningCount);
                    console.log("Message from MySQL Server : " + result.message);
                    resolve(`pekerjaan ${result.affectedRows}`)
                }
            })
        }
    })
}

module.exports = {
    getRiwayatPekerjaanByBioID: getRiwayatPekerjaanByBioID,
    savePekerjaan: savePekerjaan
}