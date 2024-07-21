import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const BookingSlotSchema = new mongoose.Schema(

    {

        poojaId: { type: String, required: true},
        userId: { type: String, required: true},
        panditId: { type: String, required: true},

        available: { type: Boolean, required: true},
        slotDate: { type: String, required: true},
        slotTime: { type: String, required: true},
       
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
BookingSlotSchema.plugin(mongoosePaginate);

const AddBookingSlotSchema = mongoose.model('booking-slot', BookingSlotSchema);

export default AddBookingSlotSchema;

