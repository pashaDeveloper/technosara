const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayloadSchema = new Schema({
  text: { type: String, required: true },
  text_color: { type: String, required: true },
  svg_icon: { type: String, default: null }
});

const VariantBadgeSchema = new Schema({
  id: { type: Number, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['special_sell', 'best_price', 'incredible', 'new_arrival', 'limited_offer']
  },
  slot: { 
    type: String, 
    required: true,
enum: ['topRightCorner', 'topLeftCorner', 'bottomRightCorner', 'bottomLeftCorner']  },
  payload: PayloadSchema
});

const VariantSchema = new Schema({
  variant_badges: [VariantBadgeSchema]
});

const Variant = mongoose.model('Variant', VariantSchema);

module.exports = { Variant };