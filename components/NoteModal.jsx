import axios from "axios";
import React, { useEffect, useState } from "react";



const NoteModal = ({closeModel, addNote, currentNote, editNote}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(currentNote) {
            setTitle(currentNote.title)
            setDescription(currentNote.description)
        }
    }, [currentNote])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentNote) {
            editNote(currentNote._id, title, description)
        } else {
            addNote(title, description)
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="note-card">
            <div>
                <h2>{currentNote ? "Edit Note" : "Add New Note"}</h2>
                <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-group"
                    placeholder="Note Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-group"
                    placeholder="Note Description"
                />
                <button type='submit' className="btn btn-action form-group">
                    {currentNote ? "Update Note" : "Add Note"} </button>
                </form>
                <button onClick={closeModel} className="btn btn-danger form-group">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NoteModal