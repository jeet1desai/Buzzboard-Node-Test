export const validateOrderData = (req, res, next) => {
  if (!req.body.order_id) {
    return res.status(404).send({ status: 404, message: "Order ID is required." });
  } else if (!req.body.item_name) {
    return res.status(404).send({ status: 404, message: "Item Name is required." });
  } else if (!req.body.cost) {
    return res.status(404).send({ status: 404, message: "Cost is required." });
  } else if (!req.body.order_date) {
    return res.status(404).send({ status: 404, message: "Order Date is required." });
  } else if (!req.body.delivery_date) {
    return res.status(404).send({ status: 404, message: "Delivery Date is required." });
  } else {
    next();
  }
};

export const validateUpdateOrderData = (req, res, next) => {
  if (!req.body.order_id) {
    return res.status(404).send({ status: 404, message: "Order ID is required." });
  } else if (!req.body.delivery_date) {
    return res.status(404).send({ status: 404, message: "Delivery Date is required." });
  } else {
    next();
  }
};

export const validateListOrderData = (req, res, next) => {
  if (!req.body.delivery_date) {
    return res.status(404).send({ status: 404, message: "Delivery Date is required." });
  } else {
    next();
  }
};

export const validateDeleteOrderData = (req, res, next) => {
  if (!req.body.order_id) {
    return res.status(404).send({ status: 404, message: "Order ID is required." });
  } else {
    next();
  }
};
