import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutPage from "./pages/LogoutPage";

const App = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>; // show loading while checking auth

  if (!isAuthenticated) {
    loginWithRedirect(); // automatically redirect to Auth0 login page
    return null; // render nothing while redirecting
  }
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </div>
  );
};

export default App;
