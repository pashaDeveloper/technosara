const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");

const variantSchema = new mongoose.Schema(
  {
    variantId: {
      type: Number,
      unique: true
    },
    lead_time: { type: Number },
    rank: { type: Number },
    rate: { type: Number },
    status: {
      type: String,
      required: true,
      enum: {
        values: [
          "marketable",
          "out_of_stock",
          "inactive",
          "on_sale",
          "new_arrival",
          "discount"
        ],
        message: "وضعیت باید یکی از مقادیر مجاز باشد: {VALUE} معتبر نیست"
      }
    },
    properties: {
      is_fast_shipping: { type: Boolean, required: true },
      is_ship_by_seller: { type: Boolean, required: true },
      is_multi_warehouse: { type: Boolean, required: true },
      has_similar_variants: { type: Boolean, required: true },
      is_rural: { type: Boolean, required: true },
      in_techkala_warehouse: { type: Boolean, required: true }
    },
    techplus: {
      type: ObjectId,
      ref: "DigiPlus",
      required: true
    },
    warranty: {
      type: ObjectId,
      ref: "Warranty",
      required: true
    },
    color: {
      type: ObjectId,
      ref: "Color",
      required: true
    },
    seller: {
      type: ObjectId,
      ref: "Seller",
      required: true
    },
    digiclub: { point: { type: Number, required: true } },
    insurance: {
      type: ObjectId,
      ref: "Insurance",
      required: true
    },
    price: {
      type: ObjectId,
      ref: "Price",
      required: true
    },
    shipment_methods: {
      type: ObjectId,
      ref: "ShipmentMethod",
      required: true
    },
    has_importer_price: { type: Boolean, required: true },
    manufacture_price_not_exist: { type: Boolean, required: true },
    has_best_price_in_last_month: { type: Boolean, required: true },
    variant_badges: [
      {
        id: { type: Number, required: true },
        type: { type: String, required: true },
        slot: { type: String, required: true },
        priority: { type: Number, required: true },
        payload: {
          text: { type: String, required: true },
          text_color: { type: String, required: true },
          svg_icon: { type: String, default: null }
        }
      }
    ]
  },
  { timestamps: true }
);

variantSchema.pre("save", async function (next) {
  try {
    if (!this.isNew || this.variantId) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "variantId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.variantId = counter.seq;

    next();
  } catch (error) {
    next(error);
  }
});

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;
