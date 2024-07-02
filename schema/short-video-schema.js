import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const ShortVideoSchema = new mongoose.Schema(

    {
        title: { type: String},
        videoUrl: { type: String},
        index: {type: Number},
        thumbnail: {type: String}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
ShortVideoSchema.plugin(mongoosePaginate);

const AddShortVideoSchema = mongoose.model('short-video', ShortVideoSchema);

export default AddShortVideoSchema;

