const { responses } = require("../common.schema");

const dataPayment = {
  type: "object",
  properties: {
    users: { type: "string", description: "id user" },
    order_id: { type: "string", description: "order id pesanan" },
    gross_amount: { type: "number", description: "total bayar" },
    payment_type: { type: "string", description: "jenis pembayaran" },
    status: { type: "string", description: "status transaksi" },
    tanggal: { type: "string", description: "tanggal transaksi" },
    payment_details: {
      type: "object",
      properties: {
        transaction_id: { type: "string", description: "id transaksi" },
        transaction_time: {
          type: "string",
          description: "tanggal dan waktu transaksi",
        },
        transaction_status: {
          type: "string",
          description: "status transaksi dari midtrans",
        },
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
            id: { type: "string", description: "id produk" },
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
  getAll: {
    tags: ["Transaction"],
    summary: "Ambil Semua Data Transaction",
    description: "Endpoint untuk mengambil semua data transaction",
    querystring: {
      order_id: {
        type: "string",
        description: "Query untuk melakukan search berdasarkan order_id",
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: { dataPayment },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },

  getById: {
    tags: ["Transaction"],
    summary: "Ambil Detail Data Transaction Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data transaction",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Transaction" } },
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

  getByUser: {
    tags: ["Transaction"],
    summary: "Ambil Semua Data Trasaction Berdasarkan Id User",
    description:
      "Endpoint untuk mengambil semua data transaction berdasarkan id user",
    params: {
      type: "object",
      properties: { idUser: { type: "string", description: "Id User" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: { dataPayment },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },

  updateStatus: {
    tags: ["Transaction"],
    summary: "Update Status Transaction Berdasarkan ID",
    description: "Endpoint untuk update status transaction",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Transaction" } },
    },
    body: {
      type: "object",
      required: ["status"],
      properties: {
        status: { type: "string", description: "status transaction" },
      },
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
  },
};
