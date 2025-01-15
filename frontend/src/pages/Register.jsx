import { useState } from "react";
import useUser from "../contexts/User/UserContext"; // Custom hook for user operations.
import { useNavigate } from "react-router-dom"; // For navigation after successful registration.

export default function Register() {
  // State to manage form inputs, errors, and loading status.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display validation or submission errors.
  const [loading, setLoading] = useState(false);

  const myUserContext = useUser(); // Access user-related context functions.
  const navigate = useNavigate();

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior.
    setLoading(true);

    // Basic validation for empty fields.
    if (!username || !email || !password) {
      setLoading(false);
      setError("All fields are required");
      return;
    }

    // Reset error state and attempt signup.
    setError("");
    myUserContext.signup(email, password, username).then((response) => {
      setLoading(false); // Stop loading spinner.
      if (!response.success) {
        alert(response.message); // Display error message for unsuccessful signup.
        return;
      }
      alert("Account created successfully!");
      navigate("/"); // Redirect to the home page on success.
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        {/* Header Section */}
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-6">Sign up to get started</p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? (
              // Loading Spinner
              <div className="flex justify-center items-center">
                <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-6 h-6 animate-spin"></div>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {/* Redirect to Sign In */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
