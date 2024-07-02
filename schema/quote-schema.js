import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const QuoteSchema = new mongoose.Schema(

    {
        imageUrl: { type: String, required: true},
        index: {type: Number, required: true},
        category: { type: [String], required: true },
        title: {type: String, required: true}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
QuoteSchema.plugin(mongoosePaginate);

const AddQuoteSchema = mongoose.model('quote', QuoteSchema);

export default AddQuoteSchema;

