import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    item_name: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: String,
      required: true,
      trim: true,
    },
    order_date: {
      type: Date,
      required: true,
      trim: true,
    },
    delivery_date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
