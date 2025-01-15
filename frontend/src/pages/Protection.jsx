import useUser from "../contexts/User/UserContext"; // Custom hook for user-related operations.
import Signin from "./Signin"; // Sign-in page component.

// Protect routes by checking user authentication status.
// eslint-disable-next-line react/prop-types
export default function Protection({ children }) {
  const { user } = useUser(); // Get the current user context.

  // If the user is authenticated, render the children components.
  // Otherwise, redirect to the sign-in page.
  return <>{user ? children : <Signin />}</>;
}
