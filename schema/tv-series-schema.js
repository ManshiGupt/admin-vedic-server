import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const TVSeriesSchema = new mongoose.Schema(

    {
        imageUrl: { type: String, required: true},
        index: {type: Number, required: true},
        subTitle: { type: String, required: true },
        title: {type: String, required: true}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
TVSeriesSchema.plugin(mongoosePaginate);

const AddTVSeriesSchema = mongoose.model('tv-series', TVSeriesSchema);

export default AddTVSeriesSchema;

