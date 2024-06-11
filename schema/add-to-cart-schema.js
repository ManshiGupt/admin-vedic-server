import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductCartSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        userId: { type: String},
    },
    {
        timestamps: true
    }
);

// Plugin pagination to schema
ProductCartSchema.plugin(mongoosePaginate);

const AddProductCartSchema = mongoose.model('product-cart', ProductCartSchema);

export default AddProductCartSchema;
