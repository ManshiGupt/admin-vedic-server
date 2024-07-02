import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const HomePageBannerSchema = new mongoose.Schema(

    {
        
        imageUrl: { type: String},
        index: {type: Number},
        pageUrl: {type: String}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
HomePageBannerSchema.plugin(mongoosePaginate);

const AddHomePageBannerSchema = mongoose.model('home-banner', HomePageBannerSchema);

export default AddHomePageBannerSchema;

