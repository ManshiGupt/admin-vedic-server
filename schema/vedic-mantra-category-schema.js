import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const VedicMantraCategorySchema = new mongoose.Schema(

    {

        title: { type: String},
        index: {type: Number}
         
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
VedicMantraCategorySchema.plugin(mongoosePaginate);

const AddVedicMantraCategorySchema = mongoose.model('mantra-category', VedicMantraCategorySchema);

export default AddVedicMantraCategorySchema;

