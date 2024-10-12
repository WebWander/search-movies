import mongoose, { Schema, Document } from 'mongoose';

interface BookmarkDocument extends Document {
  movie: mongoose.Schema.Types.ObjectId;
}

const BookmarkSchema: Schema = new Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, unique: true }
});

const Bookmark = mongoose.model<BookmarkDocument>('Bookmark', BookmarkSchema);
export default Bookmark;
