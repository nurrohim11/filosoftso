const { knex } = require("../config/Client")

module.exports ={

  product:async(req, res)=>{
    try {
      let response = []
      const { limit=10, offset=0 } = req.body
      // is the change on offset
      const barang = await knex('m_barang').limit(limit).offset(offset)
      
      if(barang.length >0){
        for(let i=0; i < barang.length; i++){
          response.push({
            id:barang[i].id,
            kode:barang[i].kode,
            nama:barang[i].nama,
            kategori:barang[i].kategori,
            satuan:barang[i].satuan,
            harga_beli:barang[i].harga_beli,
            terjual:barang[i].terjual,
            stok:barang[i].stok,
          })
        }
        status_code = 200
        message = "Berhasil"
      }
      else{
        status_code = 404
        message = "Barang tidak ada"
      }
      res.print_json(status_code,message,response)
    } catch(err){
      console.log(err)
      res.print_json(400,"Terjadi kesalahan data",[])
    }
  },

  detailProduct:async(req, res)=>{
    try {
      let response = []
      const { kode_barang } = req.body
      // is the change on offset
      const barang = await knex('m_barang').where('kode', kode_barang)
      
      if(barang.length >0){
        response = barang[0]
        status_code = 200
        message = "Berhasil"
      }
      else{
        status_code = 404
        message = "Barang tidak ada"
      }
      res.print_json(status_code,message,response)
    } catch(err){
      console.log(err)
      res.print_json(400,"Terjadi kesalahan data",[])
    } 
  }

}