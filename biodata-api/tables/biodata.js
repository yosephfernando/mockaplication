const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})
connection.connect()
const mapHelper = require('../helper')

const getBioData = (userId) => {
    return new Promise((resolve, reject) => {
        let queryString = `SELECT id_biodata, nama, posisi_dilamar, no_ktp, tanggal_lahir, tempat_lahir,
        agama, golongan_darah, status_pernikahan, alamat_ktp, alamat_tempat_tinggal, email,
        no_telp, emergency_contact, skils as skill, bersedia_ditempatkan, penghasilan_diharapkan
        FROM data_pribadi`
        if(userId) queryString += ` where id_user=${userId}`
        queryString += " ORDER BY data_pribadi.id_biodata DESC"
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

const saveBioData = (params) => {
    return new Promise((resolve, reject) => {
        let keyObjs = Object.keys(params)
        let fields = []
        let values = []
        for(field of keyObjs){
            if(field !== "pendidikan" && field !== "pekerjaan" && field !== "pelatihan"){
                fields.push(field)
                let val = params[field]
                if(typeof(val) == "string"){
                    val = `'${params[field]}'`
                }
                values.push(val)
            }
        }
        
        let queryString = `INSERT INTO data_pribadi (${fields.toString()}) values (${values.toString()})`
        connection.query(queryString, (err, result, fields) => {
            if (err){
                reject({"message":err.message})
            }else{
                console.log("Number of rows affected : " + result.affectedRows);
                console.log("Number of records affected with warning : " + result.warningCount);
                console.log("Message from MySQL Server : " + result.message);
                resolve(result.insertId)
            }
        })
        
    })
}

module.exports = {
    getBioData: getBioData,
    saveBioData: saveBioData
}