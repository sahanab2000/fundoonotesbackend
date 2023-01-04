import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllnotes = async (req, res, next) => {
  try {
    const data = await notesService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getnotes = async (req, res, next) => {
  try {
    const data = await notesService.getnotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newnotes = async (req, res, next) => {
  try {
    const data = await notesService.newnotes(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'notes created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updatenotes = async (req, res, next) => {
  try {
    const data = await notesService.updatenotes(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'notes updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deletenotes = async (req, res, next) => {
  try {
    await notesService.deletenotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'notes deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

//archive note
export const archivenote= async(req,res,next)=>{
  try {
    const data=await notesService.archivenote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'note archived successfully'
    });
    
  } catch (error) {
    next(error);
  }
};


// trash note
export const trashnote=async(req,res,next)=>{
  try {
    const data=await notesService.trashnote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'Note trashed successfully'
    })
    
  } catch (error) {
    next(error);
    
  }
};

//unarchivenote
export const unarchiveNote = async (req, res, next) => {
  try {
    const data = await NoteService.unarchiveNote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note unarchived successfully'
    });
  } catch (error) {
    next(error);
  }
};

//untrashnote
export const untrashNote = async (req, res, next) => {
  try {
      const data = await NoteService.untrashNote(req.params._id);
      res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data,
          message: 'Note unTrash successfully'
      });
  } catch (error) {
      next(error);
  }
};


