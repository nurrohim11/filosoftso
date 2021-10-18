const { knex } = require("../config/Client")
const md5 = require('blueimp-md5')

module.exports = {

  profile:async(req, res)=>{
    try{
      let response = []
      const profile = await knex('m_user').where({
        id:req.user.id
      })

      console.log(profile)

      if(profile.length > 0){
        response = profile[0]
        status_code = 200
        message = "Berhasil"
      }
      else{
        status_code = 404
        message = "User tidak ditemukan"
      }
      res.print_json(status_code, message,response)
    } catch(err){
      console.log(err)
      res.print_json(400, "Terjadi kesalahan data",[])
    }
  },

  changePassword:async(req, res)=>{
    try{
      let response = []

      const { old_password, new_password, renew_password } = req.body

      const userid = req.user.id

      const user = await knex('m_user').where({
        id:userid
      })
      
      if(old_password == '' || new_password == '' || renew_password == ''  || user[0].pass != old_password || new_password.length < 5 || new_password != renew_password){
        status_code = 400
        if(new_password != renew_password){
          message = "Password tidak sama"
        }
        if(new_password.length < 5){
          message = "Password tidak boleh kurang dari 5 karakter"
        }
        if(user[0].pass != old_password){
          message = "Password lama tidak sesuai"
        }
        if(renew_password == ''){
          message = "Masukkan ulang password baru"
        }
        if(new_password == ''){
          message = "Masukkan password baru"
        }
        if(old_password == ''){
          message = "Masukkan password lama"
        }
      }
      else{
        const process = await knex('m_user').where('id', userid).update({
          password:md5(new_password),
          pass:new_password
        })
        console.log(process)
        if(process){
          status_code = 200
          message = "Password berhasil diupdate"
        }
        else{
          status_code = 400
          message = "Password gagal diupdate"
        }
      }
      res.print_json(status_code, message,response)
    }catch(err){
      console.log(err)
      res.print_json(400, "Terjadi kesalahan data",[])
    } 
  }

}