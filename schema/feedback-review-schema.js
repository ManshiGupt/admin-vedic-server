import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PoojaCategory = new mongoose.Schema(

    {

        message: { type: String, required: true },
        stars: { type: Number, required: true },
        userName: { type: String, required: true },
        profileImage: { type: String, required: true },
        index: { type: Number, required: true },
        poojaId: { type: String, required: true },
        samagriId: { type: String, required: true },
        panditId: { type: String, required: true },
        reviewImages: { type: [String], required: true },

    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaCategory.plugin(mongoosePaginate);

const AddPoojaCategory = mongoose.model('pooja-category', PoojaCategory);

export default AddPoojaCategory;

