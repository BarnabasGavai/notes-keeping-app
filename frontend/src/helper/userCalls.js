export async function signinCall(email, password) {
  try {
    const response = await fetch(`/api/v1/users/signin`, {
      method: "POST",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}
export async function getUserCall() {
  try {
    const response = await fetch(`/api/v1/users/check`, {
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

export async function registerCall(email, password, username) {
  try {
    const response = await fetch(`/api/v1/users/register`, {
      method: "POST",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function logoutCall() {
  try {
    const response = await fetch(`/api/v1/users/logout`, {
      method: "POST",
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}
