
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import UserContextProvider from "./contexts/User/UserContextProvider";
import NoteContextProvider from "./contexts/Notes/NoteContextProvider";
import NoteEditScreen from "./pages/Edit";
import AddNoteScreen from "./pages/Add";
import Protection from "./pages/Protection";
import Dashboard from "./pages/Dashboard";
import LabelContextProvider from "./contexts/Labels/LabelContextProvider";
import LabelManagement from "./pages/LabelManage";

function App() {
  const routes = [
    { path: "/", element: <Dashboard />, protected: true },
    { path: "/add", element: <AddNoteScreen />, protected: true },
    { path: "/signin", element: <Signin />, protected: false },
    { path: "/register", element: <Register />, protected: false },
    { path: "/edit/:id", element: <NoteEditScreen />, protected: true },
    { path: "/labels", element: <LabelManagement />, protected: true },
  ];
  
  return (
    <UserContextProvider>
      <NoteContextProvider>
        <LabelContextProvider>
          <Routes>
            {routes.map(({ path, element, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={isProtected ? <Protection>{element}</Protection> : element}
              />
            ))}
          </Routes>
        </LabelContextProvider>
      </NoteContextProvider>
    </UserContextProvider>
  );
  
}

export default App;
