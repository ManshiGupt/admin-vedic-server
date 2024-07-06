import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const faqSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    descriptions: { type: String, required: true }
  },
);

const reviewSchema = new mongoose.Schema(

  {
    stars: { type: Number, required: true },
    message: { type: String, required: true },
    userName: { type: String, required: true },
    profileImage: { type: String, required: true }
  },
  
);

const relatedProductSchema = new mongoose.Schema(

  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    oldPrice: { type: String, required: true },
    newPrice: { type: String, required: true },
    productId: { type: String, required: true },
  },
  
);

const AddProductSchema = new mongoose.Schema(

  {

    images: { type: [String], required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    oldPrice: { type: String, required: true },
    newPrice: { type: String, required: true },
    productTag: {type: String, required: true},
    discountPercent: { type: String, required: true },
    faq: { type: [faqSchema], required: true }, // Array of objects for FAQ items
    productsYouMayLike: { type: [relatedProductSchema], required: true },
    productReview: { type: [reviewSchema], required: true }, // Array of objects for reviews
    category: { type: [String], required: true },
    visibility: { type: String, required: true },
    index: {type: Number, required: true},
    refundable: {type: Boolean, required: true}
  },

  {
    timestamps: true
  }
);

// Plugin pagination to schema
AddProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('product', AddProductSchema);

export default Product;
