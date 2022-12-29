import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
    title: {
      type:String
    },
    description:{
      type:String
    },
    colour:{
      type:String,

    },
    userid:{
      type:String,
    },
    isArchived:{
        type:Boolean,
        default:false
    },
    isTrashed:{
        type:Boolean,
        default:false
    },
      
      
  },
  {
    timestamps: true
  }
);

export default model('notes', notesSchema);
