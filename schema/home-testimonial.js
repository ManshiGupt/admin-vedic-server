import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const HomePageFeedback = new mongoose.Schema(

    {

        message: { type: String, required: true },
        stars: { type: Number, required: true },
        userName: { type: String, required: true },
        profileImage: { type: String, required: true },
        index: { type: Number, required: true },
        platformLogoUrl: {type: String, required: true},

    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
HomePageFeedback.plugin(mongoosePaginate);

const AddHomePageFeedback = mongoose.model('home-feedback', HomePageFeedback);

export default AddHomePageFeedback;

