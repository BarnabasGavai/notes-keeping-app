import { useEffect, useState } from "react";
import useLabel from "../contexts/Labels/LabelContext"; // Hook for label operations.

const LabelManagement = () => {
  // State to manage labels, editing state, and new label inputs.
  const [labels, setLabels] = useState([]);
  const [editingLabel, setEditingLabel] = useState(null);
  const [newName, setNewName] = useState(""); // For editing existing labels.
  const [newLabel, setNewLabel] = useState(""); // For adding new labels.

  // Hook to manage label-related operations.
  const myLabel = useLabel();

  // Fetch labels on component mount.
  useEffect(() => {
    myLabel
      .getLabels()
      .then((response) => {
        if (response.success) {
          setLabels(response.data);
        }
      })
      .catch((e) => console.error(e)); // Log API errors gracefully.
  }, []);

  // Handle editing of a label.
  const handleEdit = (label) => {
    setEditingLabel(label._id);
    setNewName(label.labelValue);
  };

  // Save edits to a label.
  const saveEdit = (id) => {
    myLabel
      .updateLabel(id, newName)
      .then((response) => {
        if (response.success) {
          setLabels(
            labels.map((label) =>
              label._id === id ? { ...label, labelValue: newName } : label
            )
          );
        } else {
          alert("Error: " + response.message);
        }
      })
      .catch((error) => console.error(error)); // Handle update errors gracefully.
    setEditingLabel(null);
  };

  // Delete a label.
  const deleteLabel = (id) => {
    myLabel
      .deleteLabel(id)
      .then((response) => {
        if (response.success) {
          setLabels(labels.filter((label) => label._id !== id));
        } else {
          alert("Error: " + response.message);
        }
      })
      .catch((error) => console.error(error)); // Handle delete errors gracefully.
  };

  // Add a new label.
  const addLabel = () => {
    if (newLabel.trim()) {
      myLabel
        .createLabel(newLabel)
        .then((response) => {
          if (response.success) {
            const label = response.data;
            setLabels((prevLabels) => [...prevLabels, label]);
          }
        })
        .catch((e) => {
          alert("ERROR: " + e.message);
        });
      setNewLabel(""); // Clear the input field after adding.
    }
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover bg-fixed bg-gray-100 flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1419923/pexels-photo-1419923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Label Management
        </h1>

        {/* Add New Label Section */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter new label name"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-purple-300"
          />
          <button
            onClick={addLabel}
            className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition"
          >
            Add
          </button>
        </div>

        {/* Label List */}
        <ul>
          {labels.length > 0 ? (
            labels.map((label) => (
              <li
                key={label._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-3 hover:shadow transition"
              >
                {editingLabel === label._id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full mr-3 border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-purple-300"
                  />
                ) : (
                  <span className="text-gray-700 font-medium">
                    {label.labelValue}
                  </span>
                )}
                <div className="flex gap-2">
                  {editingLabel === label._id ? (
                    <button
                      onClick={() => saveEdit(label._id)}
                      className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(label)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteLabel(label._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No labels available. Add some labels!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LabelManagement;
