import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { Profile } from "./pages/Profile/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { OtherProfile } from "./pages/Profile/OtherProfilePage";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // {
  //   path: "/profile",
  //   element: <ProtectedRoute><Profile /></ProtectedRoute>,
  // },
  {
    path: `/profile/:username`,
    element: <ProtectedRoute><OtherProfile /></ProtectedRoute>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
