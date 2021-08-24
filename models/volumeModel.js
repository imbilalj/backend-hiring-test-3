import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const readingPosSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pageNo: { type: Number, required: true, default: 0 },
  paraNo: { type: Number, required: true, default: 0 },
  lastWord: { type: String, required: true }
});

const volumeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    edition: {
      type: String,
      required: true
    },
    noOfPages: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    reviews: [reviewSchema],
    readingPositions: [readingPosSchema]
  },
  {
    timestamps: true
  }
);

const Volume = mongoose.model('Volume', volumeSchema);

export { Volume, volumeSchema };
