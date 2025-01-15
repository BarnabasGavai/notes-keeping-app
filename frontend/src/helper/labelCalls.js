export async function createLabelCall(label) {
  try {
    const response = await fetch(`/api/v1/labels/create`, {
      method: "POST",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labelValue: label }),
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function deleteLabelCall(labelId) {
  try {
    const response = await fetch(`/api/v1/labels/delete/:${labelId}`, {
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

export async function updateLabelCall(labelId, updateValue) {
  try {
    const response = await fetch(`/api/v1/labels/update/:${labelId}`, {
      method: "PUT",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labelValue: updateValue }),
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function getLabelCall() {
  try {
    const response = await fetch(`/api/v1/labels/`, {
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
