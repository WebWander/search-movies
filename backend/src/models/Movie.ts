import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: String, required: true },
  actors: [{ type: String }],
  genre: { type: String, required: true },
  synopsis: { type: String },
  thumbnail: { type: String },
  isTrending: { type: Boolean, default: false },
});

export default mongoose.model('Movie', MovieSchema);
