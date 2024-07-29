import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const DailyQuteSchema = new mongoose.Schema(

    {

        imageUrl: { type: String, required: true },
        date: { type: String, required: true }

    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
DailyQuteSchema.plugin(mongoosePaginate);

const AddDailyQuteSchema = mongoose.model('daily-quote', DailyQuteSchema);

export default AddDailyQuteSchema;

