import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const TransactionSchema = new mongoose.Schema(

    {

        paymentId: { type: String, required: true},
        ordeerId: { type: String, required: true},
        userId: { type: String, required: true},
        tokenAmount: { type: String, required: true},

    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
TransactionSchema.plugin(mongoosePaginate);

const AddTransactionSchema = mongoose.model('transaction', TransactionSchema);

export default AddTransactionSchema;

