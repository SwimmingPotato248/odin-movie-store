const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  first_name: { type: String, maxLength: 100 },
  last_name: { type: String, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

ActorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`;
  } else if (this.first_name) {
    fullname = this.first_name;
  } else if (this.last_name) {
    fullname = this.last_name;
  }
  return fullname;
});

ActorSchema.virtual("url").get(function () {
  return `/actor/${this._id}`;
});

module.exports = mongoose.model("Actor", ActorSchema);
