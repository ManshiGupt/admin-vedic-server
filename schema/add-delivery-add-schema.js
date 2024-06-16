import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DeliveryAddSchema = new mongoose.Schema(
    {
        houseFlatBlockNo: { type: String},
        apartmentRoadLandmark: {type: String},
        areaPinCode: {type: String},
        contactPersonName: {type: String},
        contactNo: {type: String},
        userId: { type: String},
        addressType: {type: String},
        alternateNo: {type: String},
        emailId: {type: String},
    },
    {
        timestamps: true
    }
);``

// Plugin pagination to schema
DeliveryAddSchema.plugin(mongoosePaginate);

const AddDeliveryAddSchema = mongoose.model('delivery-address', DeliveryAddSchema);

export default AddDeliveryAddSchema;
