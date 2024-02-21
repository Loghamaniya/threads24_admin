const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const approvalSchema = new Schema(
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
      unique:true,
    },
    number: {
      type: Number,
      required: true,
    },
    selectedEvents: {
      type: String,
    },
    selectedWorkshops: {
      type: String,
    },
    UPI_id: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Approval", approvalSchema);