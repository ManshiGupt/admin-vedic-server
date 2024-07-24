import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PoojaSamagriSchema = new mongoose.Schema(

    {
        title: { type: String, required: true},
        quantity: { type: String, required: true},
        category: { type: [String], required: true },
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PoojaSamagriSchema.plugin(mongoosePaginate);

const AddPoojaSamagriSchema = mongoose.model('pooja-samagri', PoojaSamagriSchema);

export default AddPoojaSamagriSchema;

