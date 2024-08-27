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
        pujaSamagri: {type: Boolean},
        bookingCancelRemark: {type: String, default: ''},
        cancelBy: {type: String, default: ''},
        bookingSlotId: {type: String},
        panditRemark: {type: String, default: ''},

        finalAmount: {type: String},

        paymentId2: { type: String},
        orderId2: { type: String},
        paymentRefundReffNo: {type: String, default: ''}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaBookingSchema.plugin(mongoosePaginate);

const AddPoojaBookingSchema = mongoose.model('pooja-booking', PoojaBookingSchema);

export default AddPoojaBookingSchema;

