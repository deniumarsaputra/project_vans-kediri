//Depedency
const Boom = require("@hapi/boom");

//Model
const User = require("./user.model");

//Schema
const {loginz, register, updateUser, detailUser} = require("./auth.schema")

async function routes(fastify, opts) {
  fastify.post("/register", {schema: register}, async (req, reply) => {
    try {
      const { fristname, lastname, username, email, password, nohp } = req.body;
      const cek = await User.findOne(
        { $and: [{ email: email }, { statusDelete: false }] },
        "_id"
      ).lean();
      if (!cek) {
        const datanya = await User.create({
          fristname: fristname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
          nohp: nohp,
          address: ""
        });
        reply.success("Berhasil melakukan register", datanya);
      } else {
        return reply.failed("Email telah terdaftar", 401);
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.post("/login", {schema: loginz}, async (req, reply) => {
    try {
      const { email, password } = req.body;
      const loginz = await User.findOne({
        $and: [{ email: email }, { statusDelete: false }],
      }).lean();
      if (!loginz) {
        return reply.failed("Email tidak terdaftar", 401);
      } else {
        if (loginz.password == password) {
          if (loginz.isActive == false) {
            return reply.failed("Akun anda sedang di non aktifkan", 401);
          } else {
            reply.success("Berhasil melakukan login", loginz);
          }
        } else {
          return reply.failed("Password salah", 401);
        }
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.get("/user/:id", {schema: detailUser}, async (req, reply) =>{
      try {
        const dataUser = await User.findOne({_id: req.params.id}, "-statusDelete -isActive").lean()
        if(!dataUser){
            return reply.failed("Gagal menampilkan data", 400)
        }else{
            reply.success("Berhasil menampilkan data", dataUser)
        }
      } catch (err) {
          throw Boom.boomify(err)
      }
  })

  fastify.put("/user/:id", {schema: updateUser}, async (req, reply) => {
    try {
      const { fristname, lastname, username, email, password, nohp, address } = req.body;
      const cekData = await User.findOne({ _id: req.params.id }, "_id").lean();
      if (!cekData) {
        return reply.failed("Id user tidak ditemukan", 400);
      } else {
        await User.updateOne(
          { _id: req.params.id },
          {
            fristname: fristname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            nohp: nohp,
            address: address
          }
        );
        reply.success("Berhasil mengupdate data");
      }
    } catch (err) {
      throw Boom.boomify(err);
    }
  });
}

module.exports = routes;
