export async function createNoteCall(note) {
  try {
    const response = await fetch(`/api/v1/notes/create`, {
      method: "POST",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function deleteNoteCall(noteId) {
  try {
    const response = await fetch(`/api/v1/notes/delete/:${noteId}`, {
      method: "DELETE",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function updateNoteCall(noteId, updates) {
  try {
    const response = await fetch(`/api/v1/notes/update/:${noteId}`, {
      method: "PUT",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function getNoteCall() {
  try {
    const response = await fetch(`/api/v1/notes/`, {
      method: "GET",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}
