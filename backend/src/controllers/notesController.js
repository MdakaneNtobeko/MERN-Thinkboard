import Note from "../models/Note.js";

// GET all notes for the logged-in user
export async function getAllNotes(req, res) {
  try {
    const userId = req.auth.sub; // Auth0 user ID
    const notes = await Note.find({ owner: userId }).sort({ createdAt: -1 }); //newest one first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.auth.sub;

    const note = new Note({ title, content, owner: userId });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const userId = req.auth.sub;
    const note = await Note.findOne({ _id: req.params.id, owner: userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.auth.sub;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const userId = req.auth.sub;

    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: userId,
    });

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
