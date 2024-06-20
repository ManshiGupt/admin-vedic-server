import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const deliveryAddress = new mongoose.Schema(
    {
        addressType: { type: String, required: true },
        fullAddress: { type: String, required: true },
        emailId: { type: String, required: true },
        contactPerson: { type: String, required: true },
        contactNo: { type: String, required: true },
        alternateContact: { type: String, required: true },
        additionalRemark: { type: String, required: true },

    },
);

const orderItems = new mongoose.Schema(

    {   
        productId: { type: String, required: true },
        imageUrl: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        oldPrice: { type: String, required: true },
        newPrice: { type: String, required: true },
        discountPercent: { type: String, required: true },
        quantity: { type: String, required: true },
    },

);

const orderStatus = new mongoose.Schema(

    {
        date: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        
    },

);

const priceDetails = new mongoose.Schema(

    {
        total: { type: String, required: true },
        discount: { type: String, required: true },
        subTotal: { type: String, required: true },
        
    },

);


const AddProductOrderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },

        userId: { type: String, required: true },
        userContact: { type: String, required: true },
        userName: { type: String, required: true },

        orderItems: { type: [orderItems], required: true },
        orderStatus: { type: [orderStatus], required: true },
        deliveryAddress: { type: deliveryAddress, required: true },
        priceDetails: { type: priceDetails, required: true },
        expectedDeliveryDate: {type: String, required: true}
        
    },
    {
        timestamps: true
    }
);

// Plugin pagination to schema
AddProductOrderSchema.plugin(mongoosePaginate);

const ProductOrderSchema = mongoose.model('product-order', AddProductOrderSchema);

export default ProductOrderSchema;
