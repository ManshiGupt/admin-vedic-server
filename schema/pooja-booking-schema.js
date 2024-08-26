import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PoojaBookingSchema = new mongoose.Schema(

    {

        bookingData: { type: Array},
        deliveryAddressData: { type: Array},
        userDetails: { type: Array},

        paymentId: { type: String, default: ''},
        orderId: { type: String, default: ''},
        
        tokenAmount: {type: String, default: ''},
        balanceAmount: {type: String, default: ''},

        poojaDate: {type: String},
        poojaTime: {type: String},

        bookingStatus: {type: String},
        additionalRemark: {type: String, default: ''},
        pujaSamagri: {type: Boolean},
        bookingCancelRemark: {type: String, default: ''},
        cancelBy: {type: String, default: ''},
        bookingSlotId: {type: String, default: ''},
        panditRemark: {trype: String, default: ''},

        finalAmount: {type: String, default: ''},

        paymentId2: { type: String, default: ''},
        orderId2: { type: String, default: ''},
        
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaBookingSchema.plugin(mongoosePaginate);

const AddPoojaBookingSchema = mongoose.model('pooja-booking', PoojaBookingSchema);

export default AddPoojaBookingSchema;

