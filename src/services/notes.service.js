import notes from '../models/notes.model';

//get all users
export const getAllnotes = async () => {
  const data = await notes.find();
  return data;
};


//create new notes
export const newnotes = async (body) => {
  const data = await notes.create(body);
  return data;
 
};

//update single user
export const updatenotes = async (_id, body) => {
  const data = await notes.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deletenotes = async (id) => {
  await notes.findByIdAndDelete(id);
  return '';
};

//get single user
export const getnotes = async (id) => {
  const data = await notes.findById(id);
  return data;
};

