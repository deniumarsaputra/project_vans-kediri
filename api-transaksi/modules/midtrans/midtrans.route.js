//Depedency
const Boom = require("@hapi/boom");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");

//Helper
const BankTrasfer = require("./payment/BankTransfer");
const { coreApi } = require("./midtrans.helper");

//Model
const Wallet = require("../transaksi/transaksi.model");
const User = require("../transaksi/user.model")
const Produk = require("../transaksi/produk.model")

//Schema
const {postPayment, updatePayment} = require('./midtrans.schema')

async function routes(fastify, opts) {
  fastify.post("/payment/bank/:idUser", {schema: postPayment}, async (req, reply) => {
    try {
      let data = {};
      const { nama_bank, items } = req.body;
      const customer = {
        email: req.body.customer.email,
        first_name: req.body.customer.first_name,
        last_name: req.body.customer.last_name,
        phone: req.body.customer.phone,
        address: req.body.customer.address,
      };

      switch (nama_bank) {
        case "BCA":
          data = await BankTrasfer.bca(customer, items);
          break;
        case "BNI":
          data = await BankTrasfer.bni(customer, items);
          break;
        case "BRI":
          data = await BankTrasfer.bri(customer, items);
          break;
        default:
          return reply.failed("Pilihan Bank Tidak Ada", 400);
      }

      const charge = await coreApi.charge(data);

      const transaksi = await Wallet.create({
        users: req.params.idUser,
        order_id: charge.order_id,
        gross_amount: charge.gross_amount,
        payment_type: charge.payment_type,
        tanggal: moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
        status: "Menunggu Pembayaran",
        payment_details: {
          transaction_id: charge.transaction_id,
          transaction_time: charge.transaction_time,
          transaction_status: charge.transaction_status,
          va_numbers: charge.va_numbers,
          currency: charge.currency,
          fraud_status: charge.fraud_status,
          merchant_id: charge.merchant_id,
        },
        customer_details: customer,
        item_details: items,
      });

      await User.updateOne({_id: req.params.idUser},{
        address: customer.address
      })

      for (let index = 0; index < items.length; index++) {
        await Produk.updateOne({_id: items[index].id},{
          $inc: {stock:  -items[index].quantity}
        })
      }

      return reply.success("Berhasil melakukan transaksi", transaksi);
    } catch (err) {
      throw Boom.boomify(err);
    }
  });

  fastify.get("/payment/status/:order_id", {schema: updatePayment}, async (req, reply) =>{
    try {
      const cek = await Wallet.findOne({order_id: req.params.order_id}).lean()
      if(!cek){
        return reply.failed("Transaksi tidak ditemukan", 400)
      }else{
        const status = await coreApi.transaction.status(req.params.order_id)

        if(status.transaction_status == "cancel"){
          await Wallet.updateOne({order_id: req.params.order_id},{
            status: "Pesanan Dibatalkan",
            payment_details: {
              transaction_id: status.transaction_id,
              transaction_time: status.transaction_time,
              transaction_status: status.transaction_status,
              va_numbers: status.va_numbers,
              currency: status.currency,
              fraud_status: status.fraud_status,
              merchant_id: status.merchant_id,
              signature_key: status.signature_key
            }
          })

          for (let index = 0; index < cek.item_details.length; index++) {
            await Produk.updateOne({_id: cek.item_details[index].id},{
              $inc: {stock:  cek.item_details[index].quantity}
            })
          }

        reply.success("Transaksi Dibatalkan", status)

        }else if (status.transaction_status == "settlement"){
          await Wallet.updateOne({order_id: req.params.order_id},{
            status: "Pesanan Sedang Di Proses",
            payment_details: {
              transaction_id: status.transaction_id,
              transaction_time: status.transaction_time,
              transaction_status: status.transaction_status,
              va_numbers: status.va_numbers,
              currency: status.currency,
              fraud_status: status.fraud_status,
              merchant_id: status.merchant_id,
              signature_key: status.signature_key
            }
          })
        reply.success("Transaksi Berhasil", status)

        }else if (status.transaction_status == "failure" || status.transaction_status == "expired"){
          await Wallet.updateOne({order_id: req.params.order_id},{
            status: "Transaksi Gagal! harap ulangi lagi",
            payment_details: {
              transaction_id: status.transaction_id,
              transaction_time: status.transaction_time,
              transaction_status: status.transaction_status,
              va_numbers: status.va_numbers,
              currency: status.currency,
              fraud_status: status.fraud_status,
              merchant_id: status.merchant_id,
              signature_key: status.signature_key
            }
          })

          for (let index = 0; index < cek.item_details.length; index++) {
            await Produk.updateOne({_id: cek.item_details[index].id},{
              $inc: {stock:  cek.item_details[index].quantity}
            })
          }
        reply.success("Transaksi Gagal", status)
        }else{
          reply.success("Transaksi Masih Pending")
        }
      }
    } catch (err) {
      throw Boom.boomify(err)
    }
  })  
}

module.exports = routes;
