import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const AccountDeleteSchema = new mongoose.Schema(

    {
        userDetails: { type: mongoose.Schema.Types.Mixed },
        remark: { type: String },
        
    },
    {
        timestamps: true
    }

);

//plugin pagination to schema
AccountDeleteSchema.plugin(mongoosePaginate);

const AddAccountDeleteSchema = mongoose.model('account-delete', AccountDeleteSchema);

export default AddAccountDeleteSchema;

