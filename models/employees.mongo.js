const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defines data types and options for database
const employeesSchema = new Schema({
  checked: { type: Boolean, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true })

const Employees = mongoose.model('Employees', employeesSchema);
module.exports = Employees;
