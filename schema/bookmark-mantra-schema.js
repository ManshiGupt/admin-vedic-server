import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const BookMarkMantraSchema = new mongoose.Schema(

    {

        userId: { type: String},
        mantraId: { type: String},
         
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
BookMarkMantraSchema.plugin(mongoosePaginate);

const AddBookMarkMantraSchema = mongoose.model('bookmark-mantra', BookMarkMantraSchema);

export default AddBookMarkMantraSchema;

