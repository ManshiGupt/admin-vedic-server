import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema(
    {
        name: { type: String, default: '' },
        contactNo: { type: String, required: true, default: '', unique: true,  },
        profilePic: { type: String, default: '' },
        email: { type: String, default: '' },
        houseNo: { type: String, default: '' },
        landMark: { type: String, default: '' },
        fullAddress: { type: String, default: '' },
        areaPinCode: { type: String, default: '' },
        state: { type: String, default: '' },
    },
    {
        timestamps: true
    }
);

const AddUserProfileSchema = mongoose.model('user-profile', UserProfileSchema);

export default AddUserProfileSchema;
