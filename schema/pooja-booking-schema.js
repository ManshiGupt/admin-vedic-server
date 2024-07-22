import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PoojaBookingSchema = new mongoose.Schema(

    {

        bookingData: { type: Array},
        deliveryAddressData: { type: Array},
        userDetails: { type: Array},

        paymentId: { type: String},
        orderId: { type: String},
        
        tokenAmount: {type: String},
        balanceAmount: {type: String},

        poojaDate: {type: String},
        poojaTime: {type: String},

        bookingStatus: {type: String},
        additionalRemark: {type: String},
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaBookingSchema.plugin(mongoosePaginate);

const AddPoojaBookingSchema = mongoose.model('pooja-booking', PoojaBookingSchema);

export default AddPoojaBookingSchema;

