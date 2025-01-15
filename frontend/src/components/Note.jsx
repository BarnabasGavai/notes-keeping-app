/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";


export default function Note(props){
   
  let note = props.note;
  const navigate = useNavigate();
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const handleNoteClick = (id) => {
    navigate(`/edit/${id}`);
  };
    return ( <div
    key={note._id}
    onClick={() => handleNoteClick(note._id)}
    className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow flex flex-col justify-between h-40 relative cursor-pointer"
    style={{ backgroundColor: note.backgroundColor }}
  >
    {/* Date in the top-right corner */}
    <p
      className="absolute top-3 right-3 text-xs"
      style={{ color: note.fontColor }}
    >
      {note.createdAt.toString().substring(0, 10)}
    </p>

    <div className="flex-1">
      {/* Title */}
      <h2
        className="text-xl font-semibold mb-3 truncate"
        style={{ color: note.fontColor }}
        title={note.Subject}
      >
        {truncateText(note.Subject, 35)}
      </h2>
      {/* Content */}
      <p
        className="text-sm  overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3, // Limit to 3 lines
          WebkitBoxOrient: "vertical",
          color: note.fontColor,
        }}
        title={note.content}
      >
        {truncateText(note.content, 80)}{" "}
        {/* Truncate at 80 characters */}
      </p>
    </div>
  </div>)
}