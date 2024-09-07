import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PoojaMantraSchema = new mongoose.Schema(

    {

        title: { type: String},
        mantra: { type: String},
        mantraBhaavaarth: { type: String},
        mantraShabdaarth: { type: String},
        category: { type: [String]},
        shlokNo: {type: String},
        index: {type: Number},
        exercise: {type: String},
        // cardHeight: { type: Number, default: 200 },
        // source: {type: String}
         
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaMantraSchema.plugin(mongoosePaginate);

const AddPoojaMantraSchema = mongoose.model('pooja-mantra', PoojaMantraSchema);

export default AddPoojaMantraSchema;

