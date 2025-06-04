import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        setFilteredNotes(
            notes.filter((note) =>
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.description.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, notes]);


    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/note', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });

            console.log("✅ Full Response:", response.data);

            if (response.data.notes) {
            setNotes(response.data.notes);
            } else if (Array.isArray(response.data)) {
            setNotes(response.data);
            }
        } catch (error) {
            console.error("❌ Fetch Notes Error:", error);
        }
        };


    const closeModel = () => {
        setModalOpen(false)
    };

    const onEdit = (note) => {
        setCurrentNote(note)
        setModalOpen(true)
    };

    const addNote = async (title, description) => {
        try {
        const response = await axios.post(
            'http://localhost:5000/api/note/add',
            { title, description }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if(response.data.success) {
             fetchNotes()
            closeModel()
        }
        } catch (error) {
        console.log(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/note/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if(response.data.success) {
                fetchNotes();
            }
        } catch (error) {
            console.log(error);
        }
    };


    const editNote = async (id, title, description) => {
        try {
            const response = await axios.put(
            `http://localhost:5000/api/note/update/${id}`,
            { title, description }, 
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            );
            if(response.data.success) {
            fetchNotes();
            closeModel();
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <Navbar setQuery={setQuery} /> {/* fixed prop name */}

            <div className="note-grid">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <NoteCard 
                            key={note._id}
                            note={note}
                            onEdit={onEdit}
                            deleteNote={deleteNote}
                        />
                    ))
                ) : (
                    <p>No notes to display.</p>
                )}
            </div>

            <button  
                className="add-note-btn"
                onClick={() => setModalOpen(true)}>
                +
            </button>

            {isModalOpen && (
                <NoteModal 
                    closeModel={closeModel}
                    addNote={addNote}
                    currentNote={currentNote}
                    editNote={editNote}
                />
            )}
        </div>

    );
};

export default Home