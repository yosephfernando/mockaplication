function mapData(rows){
    let items = {}
    Object.keys(rows).forEach(function(key) {
        items[key] = rows[key]
    })
    return items
}

function validateCreateUser(params){
    let pass = true
    if(params.email == "" || params.email == undefined) pass = false
    if(params.role == "" || params.role == undefined) pass = false
    if(params.password == "" || params.password == undefined) pass = false

    return pass
}

function validateAuth(params){
    let pass = true
    if(params.username == "" || params.username == undefined) pass = false
    if(params.password == "" || params.password == undefined) pass = false

    return pass
}

function validateCreateBio(params){
    let pass = true
    if(params.id_user == "" || params.id_user == undefined) pass = false
    if(params.nama == "" || params.nama == undefined) pass = false
    if(params.posisi_dilamar == "" || params.posisi_dilamar == undefined) pass = false
    if(params.no_ktp == "" || params.no_ktp == undefined) pass = false
    if(params.tanggal_lahir == "" || params.tanggal_lahir == undefined) pass = false
    if(params.tempat_lahir == "" || params.tempat_lahir == undefined) pass = false
    if(params.agama == "" || params.agama == undefined) pass = false
    if(params.golongan_darah == "" || params.golongan_darah == undefined) pass = false
    if(params.status_pernikahan == "" || params.status_pernikahan == undefined) pass = false
    if(params.alamat_ktp == "" || params.alamat_ktp == undefined) pass = false
    if(params.alamat_tempat_tinggal == "" || params.alamat_tempat_tinggal == undefined) pass = false
    if(params.email == "" || params.email == undefined) pass = false
    if(params.no_telp == "" || params.no_telp == undefined) pass = false
    if(params.emergency_contact == "" || params.emergency_contact == undefined) pass = false
    if(params.skils == "" || params.skils == undefined) pass = false
    if(params.bersedia_ditempatkan == "" || params.bersedia_ditempatkan == undefined) pass = false
    if(params.penghasilan_diharapkan == "" || params.penghasilan_diharapkan == undefined) pass = false

    return pass
}

function validateCreatePendidikan(params){
    let pass = true
    for(let i = 0;i<params.length;i++){
        let item = params[i]
        if(item.jenjang == "" || item.jenjang == undefined) return false
        if(item.nama_institusi == "" || item.nama_institusi == undefined) return false
        if(item.jurusan == "" || item.jurusan == undefined) return false
        if(item.tahun_lulus == "" || item.tahun_lulus == undefined) return false
        if(item.ipk == "" || item.ipk == undefined) return false
    }

    if(params.length === 0) return false

    return pass
}

function validateCreatePekerjaan(params){
    let pass = true
    for(let i = 0;i<params.length;i++){
        let item = params[i]
        if(item.nama == "" || item.nama == undefined) return false
        if(item.posisi == "" || item.posisi == undefined) return false
        if(item.pendapatan == "" || item.pendapatan == undefined) return false
        if(item.tahun == "" || item.tahun == undefined) return false
    }

    return pass
}

function validateCreatePelatihan(params){
    let pass = true
    for(let i = 0;i<params.length;i++){
        let item = params[i]
        if(item.nama == "" || item.nama == undefined) return false
        if(item.sertifikat == "" || item.sertifikat == undefined) return false
        if(item.tahun == "" || item.tahun == undefined) return false
    }

    return pass
}

function generateInsertQuery(params, tableName, idBiodata){
    params[0]["id_biodata"] = idBiodata
    let keyObjs = Object.keys(params[0])
    let fields = []
    let values = []
    for(field of keyObjs){
        fields.push(field)
    }

    for(let i=0;i<params.length;i++){
        params[i]["id_biodata"] = idBiodata
        let itemField =  Object.keys(params[i])
        let val = '('
        for(let j = 0;j<itemField.length;j++){
            if(typeof(params[i][keyObjs[j]]) == "string"){
                if(j == (itemField.length) - 1){
                    val += `'${params[i][keyObjs[j]]}'`
                }else{
                    val += `'${params[i][keyObjs[j]]}',`
                }
            }else{
                if(j == (itemField.length) - 1){
                    val += params[i][keyObjs[j]]
                }else{
                    val += `${params[i][keyObjs[j]]},`
                }
            }
        }
        val += ')'
        values.push(val)
    }
    let queryString = `INSERT INTO ${tableName} (${fields.toString()}) values ${values.toString()};`
    return queryString
}

module.exports = {
    mapData: mapData,
    validateCreateUser: validateCreateUser,
    validateAuth: validateAuth,
    validateCreateBio: validateCreateBio,
    validateCreatePendidikan: validateCreatePendidikan,
    validateCreatePekerjaan: validateCreatePekerjaan,
    validateCreatePelatihan: validateCreatePelatihan,
    generateInsertQuery: generateInsertQuery
}