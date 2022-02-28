const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})
connection.connect()
const mapHelper = require('../helper')

const getRiwayatByBioID = (bioID) => {
    return new Promise((resolve, reject) => {
        let queryString = `SELECT jenjang, nama_institusi, jurusan, tahun_lulus, ipk FROM pendidikan_terakhir`
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

const savePendidikan = (params, idBiodata) => {
    return new Promise((resolve, reject) => {
        let queryString = mapHelper.generateInsertQuery(params, "pendidikan_terakhir", idBiodata)
        connection.query(queryString, (err, result, fields) => {
            if (err){
                reject({"message":err.message})
            }else{
                console.log("Number of rows affected : " + result.affectedRows);
                console.log("Number of records affected with warning : " + result.warningCount);
                console.log("Message from MySQL Server : " + result.message);
                resolve(`pendidikan ${result.affectedRows}`)
            }
        })
    })
}

module.exports = {
    getRiwayatByBioID: getRiwayatByBioID,
    savePendidikan: savePendidikan
}