import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js';

const router = express.Router()

router.post('/add', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        console.log("Title:", title);
        console.log("Description:", description);
        console.log("User ID:", req.user.id); // log the authenticated user

        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        });

        await newNote.save();

        return res.status(200).json({ success: true, message: "Note Created Successfully" });
    } catch (error) {
        console.error("Add Note Error:", error); 
        return res.status(500).json({ success: false, message: "Note Couldn't Be Made", error: error.message });
    }
});

router.get('/', middleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }); // only fetch user's notes
        return res.status(200).json({ success: true, notes });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Notes cannot be retrieved', error: error.message });
    }
});

router.put('/update/:id', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
        return res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error("Update Note Error:", error);
        return res.status(500).json({ success: false, message: "Failed to update note", error: error.message });
    }
});

router.delete('/delete/:id', middleware, async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
        return res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error("Delete Note Error:", error);
        return res.status(500).json({ success: false, message: "Failed to delete note", error: error.message });
    }
});




export default router;