{
  /* eslint-disable no-unused-vars */
}

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import useNote from "../contexts/Notes/NoteContext"; // Custom hook for note-related operations.
import useLabel from "../contexts/Labels/LabelContext"; // Custom hook for label-related operations.
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Custom hooks to fetch and manage notes and labels.
  const mynotes = useNote(null);
  const mylabels = useLabel(null);

  // Local state to manage notes, categories, and labels.
  const [notes, setNotes] = useState(null);
  const [category, setCategory] = useState(null);
  const [labels, setLabels] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notes and labels on component mount.
    mynotes.getNotes().then((response) => {
      if (response.success) {
        setNotes(response.data);
      }
    });
    mylabels.getLabels().then((response) => {
      setLabels(response.data);
    });
  }, []);

  // Filters notes by search text.
  const searchingKeys = (text) => {
    text = text.toLowerCase();
    setNotes(
      mynotes.notes.filter((note) => {
        const mySubject = note.subject.toLowerCase();
        const myContent = note.content.toLowerCase();
        return mySubject.includes(text) || myContent.includes(text);
      })
    );
  };

  // Formats a raw date into a more human-readable format.
  const datePrettier = (rawDate) => {
    rawDate = rawDate.substring(0, 10);
    rawDate = rawDate.split("-");
    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };
    return `${rawDate[2]} ${months[rawDate[1]]} ${rawDate[0]}`;
  };

  // Filters notes by selected category.
  const changeCategory = (myValue) => {
    if (myValue === "All notes") {
      setCategory(null);
      setNotes(mynotes.notes);
      return;
    }
    setCategory(myValue);
    setNotes(
      mynotes.notes.filter((item) =>
        item.labelId
          ? item.labelId._id
            ? item.labelId._id.toString() === myValue
            : item.labelId.toString() === myValue
          : false
      )
    );
  };

  return (
    <>
      <Navbar />
      {notes ? (
        <div className="p-[2rem] px-[1rem] sm:px-[2rem] relative">
          <div className="flex flex-wrap gap-[1rem] mb-[2rem]">
            {/* Search input */}
            <input
              onChange={(e) => {
                searchingKeys(e.target.value);
              }}
              type="text"
              className="flex-1 max-w-[600px] w-full p-[0.9rem] px-[1.2rem] border border-[#D1D5DB] rounded-[10px] text-[1rem] bg-white shadow-md focus:shadow-[0_0_8px_rgba(0,0,0,0.2)]"
              placeholder="Search notes..."
            />
            {/* Category dropdown and Manage Labels button */}
            <div className="flex gap-[1rem] flex-wrap w-full sm:w-auto justify-start">
              <select
                className="sm:p-[0.9rem] sm:px-[1.2rem] border border-[#D1D5DB] rounded-[10px] text-[1rem] bg-white shadow-md transition-all w-[140px] sm:w-auto sm:h-auto h-12 p-1"
                onChange={(e) => {
                  changeCategory(e.target.value);
                }}
              >
                <option value={null}>All notes</option>
                {labels.map((label) => (
                  <option key={label._id.toString()} value={label._id.toString()}>
                    {label.labelValue}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  navigate("/labels");
                }}
                className="sm:p-[0.9rem] sm:px-[1.2rem] border border-[#D1D5DB] rounded-[10px] text-[1rem] bg-white shadow-md transition-all w-[140px] sm:w-auto focus:shadow-[0,0,8px_rgba(0,0,0,0.2)] sm:h-auto h-12 p-1"
              >
                Manage Labels
              </button>
            </div>
          </div>

          {/* No notes message */}
          {notes.length === 0 && (
            <h1 className="flex justify-center items-center">NO NOTES</h1>
          )}
          {/* Notes grid */}
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-[1rem] sm:gap-[2rem] mb-[5rem]">
            {notes.map((note) => (
              <div
                key={note._id}
                onClick={() => navigate(`/edit/${note._id}`)}
                className="p-[1.2rem] bg-[#F3F8FF] text-[#1E3A8A] rounded-[12px] text-left shadow-md transition-all hover:transform hover:translate-y-[-8px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] overflow-hidden"
                style={{
                  backgroundColor: note.backgroundColor,
                  color: note.fontColor,
                }}
              >
                <h3 className="text-[1.3rem] font-semibold mb-[0.8rem] truncate">
                  {note.subject}
                </h3>
                <div
                  className="text-[0.9rem] text-gray-600 mb-[0.8rem]"
                  style={{ color: note.fontColor }}
                >
                  <p>
                    <span style={{ fontWeight: "500" }}>Created:</span>{" "}
                    {datePrettier(note.createdAt)}
                  </p>
                  <p>
                    <span style={{ fontWeight: "500" }}>Modified:</span>{" "}
                    {datePrettier(note.updatedAt)}
                  </p>
                </div>
                <p className="text-[1rem] line-clamp-3 max-h-[5.2rem] overflow-hidden">
                  {note.content}
                </p>
              </div>
            ))}
          </div>

          {/* Floating add note button */}
          <div
            onClick={() => {
              navigate("/add");
            }}
            className="fixed bottom-[1.5rem] right-[1.5rem] bg-[#343A40] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-[2rem] shadow-md cursor-pointer transition-all hover:bg-[#495057] hover:scale-[1.1] hover:shadow-[0,8px,20px,rgba(0,0,0,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-white w-[2.5rem] h-[2.5rem]"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 5v14m7-7H5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default Dashboard;
