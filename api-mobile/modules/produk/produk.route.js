//Depedency
const Boom = require('@hapi/boom')

//Model
const Produk = require('./produk.model')
const Kategori = require('./kategori.model')

//Schema
const {getByIdProduk, getProduk, getKategori, getProdukNewRealease} = require('./produk.schema')


async function routes(fastify, opts){
    
    fastify.get("/produk", {schema: getProduk}, async (req, reply) => {
        try {
            //Search Produk Berdasarkan Nama
            const search = {}
            if(req.query.nama){
                search.name = { $regex: req.query.nama}
            }

            //Filter Berdasarkan Kategori
            const filter = {}
            if(req.query.filter){
                filter.categori = req.query.filter
            }

            const datanya = await Produk.find({$and:[search, filter, {realease: true},{statusDelete: false}]}, "_id name price stock size categori photos description").lean().populate("categori", "name")
            if(!datanya){
                return reply.failed("Gagal menampilkan data produk", 400)
            }else{
                reply.success("Berhasil menampilkan data produk", datanya)
            }

        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    fastify.get("/produk/newRealease", {schema: getProdukNewRealease}, async (req, reply) => {
        try {
            const datanya = await Produk.find({$and:[{realease: true},{newRealease: true},{statusDelete:false}]}, "_id name price stock size categori photos description").lean().populate("categori","name")
            if(!datanya){
                return reply.failed("Gagal menampilkan data produk new realease", 400)
            }else{
                reply.success("Berhasil menampilkan data produk new realease", datanya)
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    fastify.get("/produk/:id", {schema: getByIdProduk}, async (req, reply) =>{
        try {
            const dataProduk = await Produk.findOne(
                { _id: req.params.id },
                "-statusDelete -realease"
              )
                .lean()
                .populate("categori", "name");
              if (!dataProduk) {
                return reply.failed("Gagal menampilkan detail produk", 400);
              } else {
                reply.success("Berhasil menampilkan detail produk", dataProduk);
              }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })

    fastify.get("/kategori", {schema: getKategori}, async (req, reply) =>{
        try {
            const datanya = await Kategori.find({statusDelete: false}).lean()
            if(!datanya){
                return reply.failed("Gagal menampilkan data kategori", 400)
            }else{
                reply.success("Berhasil menampilkan data kategori", datanya)
            }
        } catch (err) {
            throw Boom.boomify(err)
        }
    })
}

module.exports = routes