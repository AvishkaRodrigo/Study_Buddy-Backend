const { default: mongoose } = require('mongoose');
const Note = require('../models/noteModel')

// GET all notes
const getNotes = async(req, res) => {
    const notes = await Note.find({}).sort({createdAt : -1});

    res.status(200).json(notes);

}


//  GET a single note
const getNote = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "no such note"})
    }

    const note = await Note.findById(id);

    if(!note){
        return res.status(404).json({error : "cannot find this note"});
    }
    res.status(200).json(note)
}

// CREATE a note
const createNote = async (req, res) => {
    const {heading, course_id, description} = req.body

    let emptyFields = [];

    if (!heading) {
        emptyFields.push('heading');
    }
    if (!course_id) {
        emptyFields.push('course_id');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error : 'All feilds are required to fill', emptyFields})
    }

    try {
        const note = await Note.create({heading, course_id, description});
        res.status(200).json(note);
    } catch(error) {
        res.status(400).json({error : error.message});
    }
}

// DELETE a note
const deleteNote = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "no such note"})
    }

    const note = await Note.findOneAndDelete({_id : id});

    if (!note){
        res.status(404).json({error : "cannot find this note"})
    }

    res.status(200).json(note)
}

// Update a note
const updateNote = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "no such note"})
    }

    const note = await Note.findOneAndUpdate({_id : id},{
        ...req.body
    });

    if (!note){
        res.status(404).json({error : "cannot find this note"})
    }

    res.status(200).json(note)
}


module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote

} 