import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductCartSchema = new mongoose.Schema(
    {
        itemName: { type: String }
    },
    {
        timestamps: true
    }
);

// Plugin pagination to schema
ProductCartSchema.plugin(mongoosePaginate);

const AddProductCartSchema = mongoose.model('product-cart', ProductCartSchema);

export default AddProductCartSchema;
