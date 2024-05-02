import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema(

    {
        name: { type: String, required: true },
        contactNo: { type: String, required: true},
        profilePic: { type: String },
        email: { type: String, required: true, unique: true }
    },

    {
        timestamps: true
    }

);

const AddUserProfileSchema = mongoose.model('user-profile', UserProfileSchema);

export default AddUserProfileSchema;

