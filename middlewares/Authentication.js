const jwt = require('jsonwebtoken')
const ClientService = "So-Service"
const AuthKey = "Rohimdev-Key"
const { client, knex } = require("../config/Client");

const createToken=async(user)=>{

  var now = new Date()
  var expired_at =now.getHours()+24

  const token = jwt.sign({_id:user.id},process.env.JWT_KEY)

  const token_auth = await knex('log_trx_auth').insert({
    user_id:user.id,
    timestamp:now.getTime(),
    token:token,
    expired_at: expired_at
  })

  return token

}

const verifyIdentity=(req, res, next)=>{

  const clientService = req.headers["client-service"]
  const authKey = req.headers["auth-key"]

  // check header
  if(clientService === ClientService && authKey === AuthKey){
    next()
  }
  else{
    res.print_json(405, "Authetication identity failed", [])
  }
}

const authentication=async(req, res, next)=>{
  const token = req.header('Token').replace('Bearer ', '')
  try {
    const data = jwt.verify(token, process.env.JWT_KEY)
    const userid = data._id

    const auth = await knex('log_trx_auth').where({
      user_id: userid,
      token : token
    })

    const profile = await knex('m_user').where({
      id:userid
    })

    if(auth.length > 0){
      req.user = profile[0]
      req.token = token
      next()
    }
    else{
      res.print_json(401, "Not authorized to access this resource", [])
    }
  } catch (error) {
    console.log('auth error ',error)
    res.print_json(401, "Not authorized to access this resource", [])
  }
}

module.exports = { verifyIdentity, authentication, createToken }