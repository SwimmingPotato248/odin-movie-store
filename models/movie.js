const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  release_date: { type: Date, required: true },
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre", required: true }],
  actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  director: { type: Schema.Types.ObjectId, ref: "Director" },
});

MovieSchema.virtual("url").get(function () {
  return `/movie/${this._id}`;
});

module.exports = mongoose.model("Movie", MovieSchema);
