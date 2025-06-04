import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";


const NoteCard = ({ note, onEdit, deleteNote }   ) => {
  return (
    <div className="note-grid">
      <div className='note-card'>
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <div className="note-actions">
          <button className="btn btn-action-nd" onClick={() => onEdit(note)}>
            <FaEdit />
          </button> 
          <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;