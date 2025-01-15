import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNote from "../contexts/Notes/NoteContext"; // Custom hook for note operations.
import useLabel from "../contexts/Labels/LabelContext"; // Custom hook for label operations.

const AddNoteScreen = () => {
  // State for managing the note being created.
  const [note, setNote] = useState({
    subject: "Sample Note",
    content: "This is the content of the note.",
    fontColor: "#000000",
    backgroundColor: "#ffffff",
  });

  // Temporary states for font and background colors.
  const [tempFontColor, setTempFontColor] = useState("#FFFFFF");
  const [tempBackgroundColor, setTempBackgroundColor] = useState("#487EB0");

  // State for the selected label.
  const [selectedLabel, setSelectedLabel] = useState("");

  // Hooks to interact with context and navigation.
  const { createNotes } = useNote();
  const navigate = useNavigate();
  const labels = useLabel().labels;

  // Handle saving the note.
  const handleSave = () => {
    createNotes({
      ...note,
      fontColor: tempFontColor,
      backgroundColor: tempBackgroundColor,
      labelIdString: selectedLabel,
    })
      .then((response) => {
        if (!response.success) {
          alert(response.message); // Consider a better user feedback system like toasts.
          navigate("/");
        } else {
          alert("Note saved successfully!");
          navigate("/");
        }
      })
      .catch((e) => alert(e.toString())); // Log or improve error handling.
  };

  // Handle deleting the note (not implemented yet).
  const handleDelete = () => {
    alert("Delete functionality is not implemented yet."); // Placeholder alert.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container w-11/12 max-w-4xl bg-gradient-to-tr from-white to-gray-100 rounded-2xl shadow-lg p-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-[auto_auto_1fr_auto]">
        {/* Header Section */}
        <div className="col-span-full flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-700 font-medium text-base"
          >
            &larr; Back
          </button>
          <h1 className="text-2xl font-bold text-gray-700">Add Note</h1>
        </div>

        {/* Title Input */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={note.subject}
            onChange={(e) =>
              setNote((prev) => ({ ...prev, subject: e.target.value }))
            }
            placeholder="Enter title..."
            className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Label Selector */}
        <div className="flex flex-col md:ml-5">
          <label htmlFor="label" className="mb-2 font-medium text-gray-600">
            Label
          </label>
          <select
            id="label"
            value={selectedLabel}
            onChange={(e) =>
              setSelectedLabel(e.target.value === "" ? null : e.target.value)
            }
            className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Label</option>
            {labels.map((label) => (
              <option key={label._id} value={label._id}>
                {label.labelValue}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div className="col-span-full flex flex-col">
          <label
            htmlFor="description"
            className="mb-2 font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            value={note.content}
            onChange={(e) =>
              setNote((prev) => ({ ...prev, content: e.target.value }))
            }
            rows="5"
            placeholder="Enter your notes here..."
            className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Font Color Picker */}
        <div className="flex flex-col md:mr-5">
          <label htmlFor="font-color" className="mb-2 font-medium text-gray-600">
            Font Color
          </label>
          <input
            type="color"
            id="font-color"
            value={tempFontColor}
            onChange={(e) => setTempFontColor(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Background Color Picker */}
        <div className="flex flex-col">
          <label
            htmlFor="background-color"
            className="mb-2 font-medium text-gray-600"
          >
            Background Color
          </label>
          <input
            type="color"
            id="background-color"
            value={tempBackgroundColor}
            onChange={(e) => setTempBackgroundColor(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Action Buttons */}
        <div className="col-span-full flex justify-between gap-5">
          <button
            onClick={handleDelete}
            className="flex-1 py-3 text-white font-bold bg-red-500 rounded-lg hover:bg-red-700 active:scale-95"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-700 active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteScreen;
