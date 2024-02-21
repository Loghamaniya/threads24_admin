const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countSchema = new Schema(
  {
    cyber: {
      type:Number,
      required: true,
      default:0,
    },
    uiux: {
        type: Number,
        required: true,
        default:0,
      },
      flutter: {
        type: Number,
        required: true,
        default:0,
      },
      web: {
        type: Number,
        required: true,
        default:0,
      },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Count", countSchema);