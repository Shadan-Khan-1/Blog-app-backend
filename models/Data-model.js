const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  firstName: {  type: String, require: true},
  middleName: { type: String },
  lastName: { type: String },
  email: { type: String,
    unique: true, required: true
  },
  age: { type: Number  },
  gender: { type: String  },
  hobbies :{ type: Array, },
});
const Data = mongoose.model("Data", dataSchema);


module.exports = Data;

