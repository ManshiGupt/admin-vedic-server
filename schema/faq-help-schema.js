import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const FaqHelpSchema = new mongoose.Schema(

    {
        title: { type: String},
        descriptions: { type: String},
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
FaqHelpSchema.plugin(mongoosePaginate);

const AddFaqHelpSchema = mongoose.model('faq-help', FaqHelpSchema);

export default AddFaqHelpSchema;

