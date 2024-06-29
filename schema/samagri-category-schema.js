import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const SamagriCategorySchema = new mongoose.Schema(

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
SamagriCategorySchema.plugin(mongoosePaginate);

const AddSamagriCategorySchema = mongoose.model('samagri-category', SamagriCategorySchema);

export default AddSamagriCategorySchema;

