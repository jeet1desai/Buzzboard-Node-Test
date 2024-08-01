import express from "express";
import Order from "../models/orders.js";
import { validateOrderData, validateUpdateOrderData, validateListOrderData, validateDeleteOrderData } from "../middleware/order.js";

const orders = express.Router();

// Create Order
orders.post("/orders/create", validateOrderData, async (req, res) => {
  try {
    // check for existing order
    const existingOrder = await Order.findOne({ order_id: req.body.order_id });

    if (existingOrder) {
      return res.status(401).send({ status: 401, message: "Order Already exists with Provided Order ID." });
    }

    // create order
    const order = new Order(req.body);
    await order.save();

    return res.status(200).send({ status: 200, message: "Order Created Successfully." });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error });
  }
});

// Update Order
orders.post("/orders/update", validateUpdateOrderData, async (req, res) => {
  try {
    await Order.updateOne({ order_id: req.body.order_id }, { $set: { delivery_date: new Date(req.body.delivery_date) } });

    return res.status(200).send({ status: 200, message: "Order Updated Successfully." });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error });
  }
});

// List Orders
orders.post("/orders/list", validateListOrderData, async (req, res) => {
  try {
    const dateParts = req.body.delivery_date.split("/");
    const inputDateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    // Create start and end of the day
    const startOfDay = new Date(inputDateObj);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(inputDateObj);
    endOfDay.setHours(23, 59, 59, 999);

    // Construct the query
    const query = { delivery_date: { $gte: startOfDay, $lt: endOfDay } };

    const data = await Order.find(query);

    return res.status(200).send({ status: 200, data: data });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error });
  }
});

// Search
orders.get("/orders/search", async (req, res) => {
  try {
    const data = await Order.findOne({ order_id: req.query.order_id });

    if (!data) {
      return res.status(404).send({ status: 404, message: "Order Not found for Provided Order ID." });
    }

    return res.status(200).send({ status: 200, data: data });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error });
  }
});

// Delete Order
orders.delete("/orders/delete", validateDeleteOrderData, async (req, res) => {
  try {
    const data = await Order.findOne({ order_id: req.body.order_id });

    if (!data) {
      return res.status(404).send({ status: 404, message: "Order Not found for Provided Order ID." });
    }

    await Order.deleteOne({ order_id: req.body.order_id });

    return res.status(200).send({ status: 200, message: "Order Deleted Successfully." });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error });
  }
});

export default orders;
