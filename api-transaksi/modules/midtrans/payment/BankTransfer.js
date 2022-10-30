const Boom = require("@hapi/boom");

const bca = async (customer, items) => {
  try {
    let gross_amout = 0;

    items.forEach(function (item) {
      gross_amout += item.price * item.quantity;
    });

    let payload = {
      payment_type: "bank_transfer",
      transaction_details: {
        gross_amount: gross_amout,
        order_id: new Date().getTime(),
      },
      customer_details: customer,
      items_details: items,
      bank_transfer: {
        bank: "bca",
      },
    };

    return payload;
  } catch (err) {
    throw Boom.boomify(err);
  }
};

const bni = async (customer, items) => {
  try {
    let gross_amout = 0;

    items.forEach(function (item) {
      gross_amout += item.price * item.quantity;
    });

    let payload = {
      payment_type: "bank_transfer",
      transaction_details: {
        gross_amount: gross_amout,
        order_id: new Date().getTime(),
      },
      customer_details: customer,
      items_details: items,
      bank_transfer: {
        bank: "bni",
      },
    };

    return payload;
  } catch (err) {
    throw Boom.boomify(err);
  }
};

const bri = async (customer, items) => {
  try {
    let gross_amout = 0;

    items.forEach(function (item) {
      gross_amout += item.price * item.quantity;
    });

    let payload = {
      payment_type: "bank_transfer",
      transaction_details: {
        gross_amount: gross_amout,
        order_id: new Date().getTime(),
      },
      customer_details: customer,
      items_details: items,
      bank_transfer: {
        bank: "bri",
      },
    };

    return payload;
  } catch (err) {
    throw Boom.boomify(err);
  }
};

module.exports = { bca, bni, bri };
