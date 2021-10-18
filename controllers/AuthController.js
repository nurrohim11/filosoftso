const { knex } = require("../config/Client")
const md5 = require('blueimp-md5')
const { createToken } = require("../middlewares/Authentication")

module.exports = {

  login:async(req, res)=>{
    try{
      let response = []

      const { username, password } = req.body

      const user = await knex('m_user').where({
        username:username,
      })

      if(user.length > 0){

        if(user[0].password === md5(password)){

          const token = await createToken(user[0])
          
          response = {
            id:user[0].id,
            username:user[0].username,
            nama:user[0].nama,
            no_hp:user[0].no_hp,
            email:user[0].email,
            alamat:user[0].alamat,
            token:token
          }
          status_code = 200
          message = "Login berhasil"

        }
        else{
          status_code = 400
          message = "Password tidak sama"
        }
      }
      else{
        status_code = 404
        message = "User tidak ditemukan"
      }
      res.print_json(status_code, message,response)
    }catch(err){
      console.log(err)
      res.print_json(400, "Terjadi kesalahan data",[])
    }
  },

}