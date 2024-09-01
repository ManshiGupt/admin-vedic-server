import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const ReelsAdsSchema = new mongoose.Schema(

    {

        title: { type: String, required: true },
        image: { type: String, required: true },
        pageUrl: { type: String},
        pujaId: { type: String, required: true },
        index: { type: Number, required: true },

    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
ReelsAdsSchema.plugin(mongoosePaginate);

const AddReelsAdsSchema = mongoose.model('reels-ad', ReelsAdsSchema);

export default AddReelsAdsSchema;

