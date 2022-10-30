const { responses } = require("../common.schema");

const data = {
  type: "object",
  properties: {
    _id: { type: "string", description: "_id user" },
    fristname: { type: "string", description: "nama depan user" },
    lastname: { type: "string", description: "nama belakang user" },
    username: { type: "string", description: "username user" },
    email: { type: "string", description: "email user" },
    nohp: { type: "string", description: "nohp user" },
    address: {type: "string", description: "alamat user"}
  },
};

module.exports = {
  loginz: {
    tags: ["Authentication"],
    summary: "Validasi login pengguna mobile",
    description: "Endpoint untuk melakukan validasi login pengguna mobile",
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", description: "email mobile user" },
        password: { type: "string", description: "password mobile user" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: { type: "object", properties: { data } },
        },
      },
      401: responses.error401,
    },
  },

  register: {
    tags: ["Authentication"],
    summary: "Registrasi pengguna mobile",
    description: "Endpoint untuk registrasi mobile user",
    body: {
      type: "object",
      required: [
        "fristname",
        "lastname",
        "username",
        "email",
        "password",
        "nohp",
      ],
      properties: {
        fristname: { type: "string", description: "frisname user" },
        lastname: { type: "string", description: "lastname user" },
        username: { type: "string", description: "username user" },
        email: { type: "string", description: "email user" },
        nohp: { type: "string", description: "nohp user" },
        password: { type: "string", description: "password user" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          ...responses.success200.properties,
          result: {data},
        },
      },
      401: responses.error401,
    },
  },

  updateUser:{
    tags: ["Authentication"],
    summary: "Update Data Mobile User Berdasarkan ID",
    description: "Endpoint untuk update data mobile user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Mobile User" } },
    },
    body: {
      type: "object",
      required: ["fristname","lastname","username", "email", "password","nohp"],
      properties: {
        fristname: {type: "string", description: "frisname user"},
        lastname: {type: "string", description: "lastname user"},
        username: { type: "string", description: "username user" },
        email: { type: "string", description: "email user" },
        nohp: {type: "string", description: "nohp user"},
        password: { type: "string", description: "password user" },
        address: { type: "string", description: "address user"}
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

  detailUser:{
    tags: ["Authentication"],
    summary: "Ambil Detail Data Mobile User Berdasarkan ID",
    description: "Endpoint untuk mengambil detail data mobile user",
    params: {
      type: "object",
      properties: { id: { type: "string", description: "Id Mobile User" } },
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
  }
};
