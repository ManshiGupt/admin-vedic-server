import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const FeedbackReview = new mongoose.Schema(

    {

        message: { type: String, required: true },
        stars: { type: Number, required: true },
        userName: { type: String, required: true },
        profileImage: { type: String, required: true },
        index: { type: Number, required: true },
        poojaId: { type: String, required: true },
        samagriId: { type: String, required: true },
        panditId: { type: String, required: true },
        userId: {type: String, required: true},
        reviewImages: { type: [String], required: true },

    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
FeedbackReview.plugin(mongoosePaginate);

const AddFeedbackReview = mongoose.model('feedback-review', FeedbackReview);

export default AddFeedbackReview;

