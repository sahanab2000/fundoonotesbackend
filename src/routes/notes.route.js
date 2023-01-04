import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all notes
router.get('', notesController.getAllnotes);

//route to create a new note
router.post('/create', userAuth, notesController.newnotes);

//route to get note for given id
router.get('/:_id',userAuth, notesController.getnotes);

//route to update notes
router.put('/:_id',userAuth, notesController.updatenotes);

//route to delete note
router.delete('/:_id',userAuth, notesController.deletenotes);  

//route to archive notes
router.put('/:_id/archive',userAuth, notesController.archivenote);

//route to trash notes
router.put('/:_id/trash',userAuth, notesController.trashnote);

//route to unarchive a note
router.put('/:_id/unarchive',userAuth, notesController.unarchiveNote );

//route to untrash a note
router.put('/:_id/untrash',userAuth, notesController.untrashNote);




export default router;