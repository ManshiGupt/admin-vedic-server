import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserLogSchema = new mongoose.Schema(
    {
        userId: { type: String },
        logText: { type: mongoose.Schema.Types.Mixed } // Use Mixed type for flexible data
    },
    {
        timestamps: true
    }
);

// Plugin pagination to schema
UserLogSchema.plugin(mongoosePaginate);

const AddUserLogSchema = mongoose.model('user-log', UserLogSchema);

export default AddUserLogSchema;