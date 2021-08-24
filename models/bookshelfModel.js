import mongoose from 'mongoose';
import { volumeSchema } from './volumeModel.js';

const bookshelfSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    volumes: [volumeSchema],
    isPrivate: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Bookshelf = mongoose.model('Bookshelf', bookshelfSchema);

export default Bookshelf;
