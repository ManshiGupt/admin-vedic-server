import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const ProfileVerification = new mongoose.Schema(

    {

        userId: { type: String, required: true},
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
ProfileVerification.plugin(mongoosePaginate);

const AddProfileVerification = mongoose.model('profile-verification', ProfileVerification);

export default AddProfileVerification;

