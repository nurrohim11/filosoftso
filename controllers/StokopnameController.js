const { knex } = require("../config/Client")

module.exports = {

  stokOpname:async(req, res)=>{
    try{
      let response = []
      const { limit=10, offset=0 } = req.body
      // is the change on offset
      const so = await knex('t_stok_opname').limit(limit).offset(offset)

      if(so.length > 0){
        response = so
        status_code = 200
        message = "Berhasil"
      }
      else{
        status_code = 404
        message = "Tidak ada produk stok stok opname"
      }
      res.print_json(status_code,message,response)
    } catch(err){
      console.log(err)
      res.print_json(400,"Terjadi kesalahan data",[])
    }
  },

  prosesStokopname:async(req, res)=>{
    try{
      let response = []
      const { id_barang, kode_barang, nama_barang, harga_beli, stok_komputer, stok_nyata, selisih, total_selisih, keterangan } = req.body

      if(stok_nyata != ''){

        const tgl = await new Date()

        await knex.transaction((trx)=>{

          knex('t_stok_opname').transacting(trx).insert({
            id_barang : id_barang,
            nama_barang : nama_barang,
            kode_barang : kode_barang,
            harga_beli : harga_beli,
            stok_komputer : stok_komputer,
            stok_nyata : stok_nyata,
            selisih : selisih,
            total_selisih : total_selisih,
            date: `${tgl.getFullYear()}-${tgl.getMonth+1}-${tgl.getDate}`,
            keterangan : keterangan,
          })
          .then(resp=>{
            console.log(resp)
          })

          knex('m_barang').transacting(trx).where('id',id_barang).update({
            stok:stok_nyata
          })
          .then(resp=>{
            console.log(resp)
          })
          .then(trx.commit)
          .catch(trx.rollback)

        })
        .then(resp=>{
          status_code = 200
          message = "Stok opname berhasil di proses"
          console.log('Transaction complete')
        })
        .catch(err=>{
          status_code = 400
          message = "Stok opname gagal di proses"
          console.log(err)
        })
      }
      else{
        status_code = 400
        message = "Stok nyata tidak boleh kosong"
      }
      
      res.print_json(status_code,message,response)
    } catch(err){
      console.log(err)
      res.print_json(400,"Terjadi kesalahan data",[])
    }
  }

}