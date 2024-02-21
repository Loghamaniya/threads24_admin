const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const detailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    selectedCollege: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    selectedYear: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique:true,
    },
    number: {
      type: Number,
      required: true,
    },
    selectedEvents: {
      type: String,
      // required: true,
    },
    selectedWorkshops: {
      type: String,
      // required: true,
    },
    upievent:{
        type:String,
        default: 'no'
    },
    upiworkshop:{
        type:String,
        default: 'no'
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Detail", detailSchema);

