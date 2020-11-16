var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema(
{
    name: String,
    tick: {type: Boolean, default: false}
});

module.exports = mongoose.model("ToDo", todoSchema);