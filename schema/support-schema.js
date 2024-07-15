import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const SupportSchema = new mongoose.Schema(

    {
        name: { type: String, required: true},
        mobile: {type: Number, required: true},
        email: { type: String, required: true },
        message: {type: String, required: true}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
SupportSchema.plugin(mongoosePaginate);

const AddSupportSchema = mongoose.model('support-query', SupportSchema);

export default AddSupportSchema;

