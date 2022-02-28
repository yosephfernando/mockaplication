const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})
connection.connect()
const mapHelper = require('../helper')

const getRiwayatPelatihanByBioID = (bioID) => {
    return new Promise((resolve, reject) => {
        let queryString = `SELECT nama, sertifikat, tahun FROM riwayat_pelatihan`
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

const savePelatihan = (params, idBiodata) => {
    return new Promise((resolve, reject) => {
        if(params.length > 0){
            let queryString = mapHelper.generateInsertQuery(params, "riwayat_pelatihan", idBiodata)
            connection.query(queryString, (err, result, fields) => {
                if (err){
                    reject({"message":err.message})
                }else{
                    console.log("Number of rows affected : " + result.affectedRows);
                    console.log("Number of records affected with warning : " + result.warningCount);
                    console.log("Message from MySQL Server : " + result.message);
                    resolve(`pelatihan ${result.affectedRows}`)
                }
            })
        }
    })
}

module.exports = {
    getRiwayatPelatihanByBioID: getRiwayatPelatihanByBioID,
    savePelatihan: savePelatihan
}