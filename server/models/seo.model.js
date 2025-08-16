const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  twitter_card: {
    title: { type: String },
    image: { type: String },
    price: { type: Number },
    description: { type: String },
  },
  open_graph: {
    title: { type: String },
    url: { type: String },
    image: { type: String },
    availability: { type: String },
    type: { type: String },
    site: { type: String },
    price: { type: Number },
  },
  header: {
    title: { type: String },
    description: { type: String },
    canonical_url: { type: String },
  },
  markup_schema: [{ type: Object }],
});

const Seo = mongoose.model("Seo", seoSchema);

module.exports = Seo;