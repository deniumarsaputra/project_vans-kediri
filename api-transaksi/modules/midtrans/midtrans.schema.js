const { responses } = require("../common.schema");

const dataPayment = {
  type: "object",
  properties: {
    users: { type: "string", description: "id user" },
    order_id: { type: "string", description: "order id pesanan" },
    gross_amount: { type: "number", description: "total bayar" },
    payment_type: { type: "string", description: "jenis pembayaran" },
    status: {type: "string", description: "status transaksi"},
    tanggal: {type: "string", description: "tanggal transaksi"},
    payment_details: {
      type: "object",
      properties: {
        transaction_id: { type: "string", description: "id transaksi" },
        transaction_time: {
          type: "string",
          description: "tanggal dan waktu transaksi",
        },
        transaction_status: { type: "string", description: "status transaksi dari midtrans" },
        va_numbers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              bank: { type: "string", description: "nama bank" },
              va_number: {
                type: "string",
                description: "virtual account number",
              },
            },
          },
        },
        currency: { type: "string", description: "mata uang" },
        fraud_status: { type: "string", description: "status midtrans" },
        merchant_id: { type: "string", description: "id penjual di midtrans" },
      },
      customer_details: {
        type: "object",
        properties: {
          first_name: { type: "string", description: "nama depan" },
          last_name: { type: "string", description: "nama belakang" },
          email: { type: "string", description: "email pembeli" },
          phone: { type: "string", description: "no pembeli" },
          address: { type: "string", description: "alamat pembeli" },
        },
      },
      item_details: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "kode produk" },
            price: { type: "string", description: "harga produk" },
            quantity: { type: "string", description: "qty produk" },
            name: { type: "string", description: "nama produk" },
          },
        },
      },
    },
  },
};

module.exports = {
  postPayment: {
    tags: ["Payment"],
    summary: "Tambah Transaksi",
    description: "Endpoint untuk menambah transaksi",
    params: {
        type: "object",
        properties: { idUser: { type: "string", description: "idUser" } },
    },
    body: {
      type: "object",
      required: [
        "nama_bank","customer","items"
      ],
      properties: {
        nama_bank: {type: "string", description: "nama bank [BCA, BRI, BNI]"},
        customer:{
            type: "object",
            properties:{
                email: {type: "string", description: "email pembeli"},
                first_name: {type: "string", description: "nama depan pembeli"},
                last_name: {type: "string", description: "nama belakang pembeli"},
                phone: {type: "string", description: "no pembeli"},
                address: {type: "string", description: "alamat pembeli"}
            }
        },items:{
            type: "array",
            items:{
                type: "object",
                properties:{
                    id: {type: "string", description: "id produk"},
                    price: {type: "number", description: "harga produk"},
                    quantity: {type: "number", description: "qty produk"},
                    name: {type: "string", description: "nama produk"}
                }
            }
        }
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: { dataPayment },
        },
      },
      401: responses.error401,
    },
  },

  updatePayment:{
    tags: ["Payment"],
    summary: "Update Transaction Status dan Signature Key Dari Midtrans",
    description: "Endpoint untuk update status dan signature key dari midtrans",
    params: {
      type: "object",
      properties: { order_id: { type: "string", description: "order_id transaction" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
        },
      },
      401: responses.error401,
    },
  }
};
