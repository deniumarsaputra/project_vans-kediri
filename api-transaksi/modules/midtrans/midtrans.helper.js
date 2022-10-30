const midtransClient = require('midtrans-client')
const Config = require('../../config')

const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: Config.midtrans.serverKey,
    clientKey: Config.midtrans.clientKey
});

module.exports = {coreApi}