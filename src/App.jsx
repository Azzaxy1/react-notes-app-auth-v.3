import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import reactIcon from "./assets/react.png";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DetailNotePages from "./pages/DetailNotePage";
import AddNotePage from "./pages/AddNotePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import WrapperArchivedPage from "./pages/ArchivedPage.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { LocaleProvider } from "./contexts/LocaleContext.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { getUserLogged, putAccessToken } from "./utils/network-data.js";
import toast from "react-hot-toast";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "id";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const toggleLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");

    toast.success("Logout success");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };

    fetchUser();
  }, []);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <main className="relative min-h-screen font-sans bg-primary">
        <div className="absolute top-5 right-3 md:right-10 ">
          <img
            src={reactIcon}
            alt="react icon"
            width={200}
            className="w-20 md:w-32"
          />
        </div>
        <div className="absolute bottom-5 left-3 md:left-10 ">
          <img
            src={reactIcon}
            alt="react icon"
            width={200}
            className="w-20 md:w-32"
          />
        </div>
        <Routes>
          <Route
            path="/*"
            element={<LoginPage loginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <LocaleProvider value={{ locale, toggleLocale }}>
        <main
          className={`relative min-h-screen font-sans ${
            theme === "light" ? "bg-lightMode" : "bg-darkMode"
          }`}
        >
          <div className="absolute top-5 right-3 md:right-10 ">
            <img
              src={reactIcon}
              alt="react icon"
              width={200}
              className="w-20 md:w-32"
            />
          </div>
          <div className="absolute bottom-5 left-3 md:left-10 ">
            <img
              src={reactIcon}
              alt="react icon"
              width={200}
              className="w-20 md:w-32"
            />
          </div>
          <Navbar logout={onLogout} name={authedUser.name} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes/:id" element={<DetailNotePages />} />
            <Route path="/notes/archived" element={<WrapperArchivedPage />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </main>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
