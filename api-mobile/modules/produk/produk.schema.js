const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id produk" },
    kode: { type: "string", description: "kode produk" },
    name: { type: "string", description: "nama produk" },
    price: { type: "number", description: "harga produk" },
    stock: { type: "number", description: "stock produk" },
    size: { type: "string", description: "size produk" },
    categori: {
      type: "object",
      properties: {
        _id: { type: "string", description: "id kategori" },
        name: { type: "string", description: "nama kategori" },
      },
    },
    description: { type: "string", description: "deskripsi produk" },
    tags: { type: "string", description: "tag produk" },
    photos: {
      type: "object",
      properties: {
        p1: { type: "string", description: "photo 1" },
        p2: { type: "string", description: "photo 2" },
        p3: { type: "string", description: "photo3" },
      },
    },
    realease: { type: "boolean", description: "status produk" },
    newRealease: { type: "boolean", description: "status produk newRealease" },
  },
};

const data2 = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id kategori" },
    name: { type: "string", description: "name kategori" },
  },
};

module.exports = {
  getProduk: {
    tags: ["Produk"],
    summary: "Ambil Semua Data Produk",
    description: "Endpoint untuk mengambil semua data produk",
    querystring: {
      nama: {
        type: "string",
        description: "Query untuk melakukan search berdasarkan nama",
      },
      categori: {
        type: "string",
        description: "Query untuk filter berdasarkan kategori",
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
                items: { data },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },

  getProdukNewRealease: {
    tags: ["Produk"],
    summary: "Ambil Semua Data Produk New Realease",
    description: "Endpoint untuk mengambil semua data produk new realease",
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
                items: { data },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },

  getByIdProduk: {
    tags: ["Produk"],
    summary: "Ambil Detail Data Produk Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data produk",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id produk" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: { data },
        },
      },
      401: responses.error401,
    },
  },

  getKategori: {
    tags: ["Kategori"],
    summary: "Ambil Semua Data Kategori",
    description: "Endpoint untuk mengambil semua data kategori",
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
                items: { data2 },
              },
            },
          },
        },
      },
      401: responses.error401,
    },
  },
};
