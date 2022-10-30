//Depedency
const Boom = require("@hapi/boom");

//Model
const Wallet = require("./transaksi.model");
const User = require("./user.model")

//Schema
const {getAll, getById, getByUser, updateStatus} = require('./transaksi.schema')

async function routes(fastify, opts) {
  fastify.get("/transaction", {schema: getAll}, async (req, reply) => {
    try {
      const { tgl1, tgl2 } = req.query

      const datanya = await Wallet.find({ $and: [{ tanggal: {$gte: tgl1} }, { tanggal: {$lte: tgl2} } ]}).lean().populate("users", "username");
      if (!datanya) {
        return reply.failed("Gagal menampilkan data transaksi", 400);
      } else {
        reply.success("Berhasil menampilkan data", datanya);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.get("/transaction/:id", {schema: getById}, async (req, reply) => {
    try {
      const datanya = await Wallet.findOne({ _id: req.params.id }).lean().populate("users", "username");
      if (!datanya) {
        return reply.failed("Gagal menampilkan data", 400);
      } else {
        reply.success("Berhasil menampilkan data", datanya);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.get("/transaction/mobile/:idUser", {schema: getByUser}, async (req, reply) => {
    try {
      const datanya = await Wallet.find({ users: req.params.idUser }).lean().populate("users", "username");
      if (!datanya) {
        return reply.failed("Gagal menampilkan data", 400);
      } else {
        reply.success("Berhasil menampilkan data", datanya);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.put("/transaction/:id", {schema: updateStatus}, async (req, reply) => {
    try {
      const { status } = req.body;
      const datanya = await Wallet.find({ _id: req.params.id }).lean().populate("users", "username");
      if (!datanya) {
        return reply.failed("Gagal menampilkan data", 400);
      } else {
        await Wallet.updateOne({_id: req.params.id},{
            status: status
        })
        reply.success("Berhasil mengupdate status transaksi");
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });
}

module.exports = routes;
