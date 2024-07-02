import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PoojaCategory = new mongoose.Schema(

    {
        title: { type: String},
        imageUrl: { type: String},
        index: {type: Number}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaCategory.plugin(mongoosePaginate);

const AddPoojaCategory = mongoose.model('pooja-category', PoojaCategory);

export default AddPoojaCategory;

